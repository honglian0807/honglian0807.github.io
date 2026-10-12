#!/usr/bin/env python3
"""Fit image files to exact 1500 square without stretching; validate full decoding."""
import argparse, json, os, shutil, subprocess
from pathlib import Path

def prepare(source, target):
    source, target = Path(source).resolve(), Path(target).resolve()
    if not source.is_file():
        raise ValueError('Missing source image')
    if source == target:
        raise ValueError('Use a separate final path')
    exe = shutil.which('magick') or shutil.which('convert')
    identify = shutil.which('identify')
    if not exe or not identify:
        raise RuntimeError('ImageMagick is required')
    target.parent.mkdir(parents=True, exist_ok=True)
    temp = target.with_name(target.stem + '.working' + target.suffix)
    subprocess.run([exe, str(source), '-auto-orient', '-background', 'white', '-filter', 'Lanczos', '-resize', '1500x1500', '-gravity', 'center', '-extent', '1500x1500', '-quality', '96', str(temp)], check=True, capture_output=True)
    size = subprocess.check_output([identify, '-format', '%wx%h', str(temp)], text=True)
    if size != '1500x1500':
        raise ValueError('Image dimension validation failed')
    subprocess.run([exe, str(temp), 'null:'], check=True, capture_output=True)
    os.replace(temp, target)
    return {'path': str(target), 'width': 1500, 'height': 1500}

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('manifest', help='JSON list of source/target image paths')
    args = parser.parse_args()
    jobs = json.loads(Path(args.manifest).read_text())
    results = [prepare(job['source'], job['target']) for job in jobs]
    print(json.dumps(results, ensure_ascii=False))

if __name__ == '__main__':
    main()
