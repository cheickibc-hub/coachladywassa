#!/bin/bash
# Build script for Render — Coach Lady Wassa backend
set -e

echo "==> Installing Python dependencies…"
pip install --upgrade pip
pip install -r requirements.txt

echo "==> Pre-rendering book pages from PDF…"
python << 'PYEOF'
from pathlib import Path

pdf_path = Path("private_files/livre.pdf")
pages_dir = Path("private_files/pages")

if not pdf_path.exists():
    print(f"WARNING: {pdf_path} not found — skipping page render.")
else:
    pages_dir.mkdir(parents=True, exist_ok=True)
    already = list(pages_dir.glob("page_*.jpg"))
    if len(already) >= 148:
        print(f"OK: {len(already)} pages already rendered — skipping.")
    else:
        import fitz
        doc = fitz.open(str(pdf_path))
        total = doc.page_count
        mat = fitz.Matrix(2.0, 2.0)
        for i in range(total):
            out = pages_dir / f"page_{i+1:03d}.jpg"
            if not out.exists():
                pix = doc[i].get_pixmap(matrix=mat, alpha=False)
                pix.save(str(out), jpg_quality=80)
        doc.close()
        print(f"Rendered {total} pages OK.")
PYEOF

echo "==> Build complete."
