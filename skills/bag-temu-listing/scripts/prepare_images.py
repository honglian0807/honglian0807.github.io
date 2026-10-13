#!/usr/bin/env python3
"""Fit image files to exact 1500 square without stretching; validate full decoding."""
import argparse, json, os, shutil, subprocess, sys
from pathlib import Path

def validate(source):
    source = Path(source).resolve()
    if not source.is_file():
        raise ValueError('Missing image file')
    exe = shutil.which('magick') or shutil.which('convert')
    identify = shutil.which('identify')
    if not exe or not identify:
        raise RuntimeError('ImageMagick is required')
    size = subprocess.check_output([identify, '-format', '%wx%h', str(source)], text=True)
    if size != '1500x1500':
        raise ValueError(f'Every final bag image must be exactly 1500x1500 pixels: {source} is {size}')
    subprocess.run([exe, str(source), 'null:'], check=True, capture_output=True)
    return {'path': str(source), 'width': 1500, 'height': 1500}

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
    validate(temp)
    os.replace(temp, target)
    return {'path': str(target), 'width': 1500, 'height': 1500}

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('manifest', help='JSON list of image paths, or - to read JSON from stdin')
    parser.add_argument('--check-only', action='store_true', help='Reject any final image that is not exactly 1500x1500; do not edit files')
    args = parser.parse_args()
    jobs = json.load(sys.stdin) if args.manifest == '-' else json.loads(Path(args.manifest).read_text())
    if not isinstance(jobs, list) or not jobs:
        raise ValueError('A nonempty image manifest is required')
    results = [validate(job['path']) if args.check_only else prepare(job['source'], job['target']) for job in jobs]
    print(json.dumps(results, ensure_ascii=False))

if __name__ == '__main__':
    main()
