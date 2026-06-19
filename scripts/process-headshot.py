#!/usr/bin/env python3
"""Crop and enhance Shweta Singh headshot for website use."""

from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter, ImageOps

SRC = Path(
    "/Users/ds/.cursor/projects/Users-ds-singhrealtor-site/assets/"
    "Gemini_Generated_Image_5jb1hr5jb1hr5jb1-bb7d6ee1-a8f4-4fd9-8e8d-79b7fb87bc9c.png"
)
OUT_DIR = Path("/Users/ds/singhrealtor-site/public/images")
OUT_DIR.mkdir(parents=True, exist_ok=True)

TARGET_RATIO = 4 / 5  # width / height for portrait cards


def crop_portrait(img: Image.Image, focus_y_ratio: float = 0.42) -> Image.Image:
    """Crop to 4:5 portrait, centered horizontally on focus point."""
    w, h = img.size
    # Leave room at bottom to exclude watermark in lower-right corner
    usable_h = int(h * 0.94)
    usable_w = w

    # Max crop box with 4:5 ratio inside usable area
    crop_h = usable_h
    crop_w = int(crop_h * TARGET_RATIO)
    if crop_w > usable_w:
        crop_w = usable_w
        crop_h = int(crop_w / TARGET_RATIO)

    center_x = w // 2
    center_y = int(usable_h * focus_y_ratio)

    left = max(0, center_x - crop_w // 2)
    top = max(0, center_y - crop_h // 2)
    left = min(left, w - crop_w)
    top = min(top, usable_h - crop_h)

    return img.crop((left, top, left + crop_w, top + crop_h))


def enhance(img: Image.Image) -> Image.Image:
    img = ImageOps.exif_transpose(img)
    # Subtle professional polish
    img = ImageEnhance.Brightness(img).enhance(1.06)
    img = ImageEnhance.Contrast(img).enhance(1.08)
    img = ImageEnhance.Color(img).enhance(1.05)
    img = ImageEnhance.Sharpness(img).enhance(1.15)
    img = img.filter(ImageFilter.UnsharpMask(radius=1.2, percent=80, threshold=3))
    return img


def export_sizes(img: Image.Image, base_name: str) -> None:
    sizes = {
        "full": 1200,
        "card": 800,
        "thumb": 400,
    }
    for label, max_width in sizes.items():
        ratio = img.height / img.width
        w = min(max_width, img.width)
        h = int(w * ratio)
        resized = img.resize((w, h), Image.Resampling.LANCZOS)

        webp_path = OUT_DIR / f"{base_name}-{label}.webp"
        jpg_path = OUT_DIR / f"{base_name}-{label}.jpg"
        resized.save(webp_path, "WEBP", quality=88, method=6)
        resized.save(jpg_path, "JPEG", quality=90, optimize=True)
        print(f"Saved {webp_path} ({w}x{h})")


def main() -> None:
    img = Image.open(SRC).convert("RGB")
    print(f"Source: {img.size[0]}x{img.size[1]}")

    cropped = crop_portrait(img)
    print(f"Cropped: {cropped.size[0]}x{cropped.size[1]}")

    enhanced = enhance(cropped)

    # Primary assets used by the site
    export_sizes(enhanced, "shweta-singh")

    # Default filename aliases (card size is the sweet spot for About sections)
    card = enhanced.resize(
        (800, int(800 * enhanced.height / enhanced.width)),
        Image.Resampling.LANCZOS,
    )
    card.save(OUT_DIR / "shweta-singh.webp", "WEBP", quality=88, method=6)
    card.save(OUT_DIR / "shweta-singh.jpg", "JPEG", quality=90, optimize=True)
    print("Saved public/images/shweta-singh.webp and shweta-singh.jpg")


if __name__ == "__main__":
    main()
