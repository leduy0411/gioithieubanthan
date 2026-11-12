from PIL import Image, ImageFilter
import sys
import os

input_path = "d:/web_giơithieubanthan/public/images/duy-portrait.png"
output_path = "d:/web_giơithieubanthan/public/images/duy-portrait-cutout.png"

try:
    import rembg
    print("rembg is available! Running AI background removal...")
    input_img = Image.open(input_path)
    output_img = rembg.remove(input_img)
    output_img.save(output_path, "PNG")
    print(f"Saved AI cutout to {output_path}")
    sys.exit(0)
except Exception as e:
    print(f"rembg failed or not ready ({e}), using precision alpha floodfill fallback...")

# Fallback: Precision background subtraction using PIL
img = Image.open(input_path).convert("RGBA")
w, h = img.size
pixels = img.load()

# Create binary mask of background
# Background is nearly (0,0,0) with max channel <= 6
from PIL import ImageDraw
mask = Image.new("L", (w, h), 0) # 0 = foreground (keep), 255 = background (remove)
draw = ImageDraw.Draw(mask)

# Flood fill from all 4 corners and along the top/left/right borders
# with tolerance to only catch the near-black background
draw_img = img.convert("RGB")
ImageDraw.floodfill(mask, (0, 0), 255, thresh=8)
ImageDraw.floodfill(mask, (w - 1, 0), 255, thresh=8)
ImageDraw.floodfill(mask, (0, h // 2), 255, thresh=8)
ImageDraw.floodfill(mask, (w - 1, h // 2), 255, thresh=8)
ImageDraw.floodfill(mask, (w // 2, 0), 255, thresh=8)

# Feather the mask slightly for smooth anti-aliased hair/suit edge
# Invert mask so 255 = keep, 0 = transparent
inverted_mask = Image.eval(mask, lambda a: 255 - a)
feathered_mask = inverted_mask.filter(ImageFilter.GaussianBlur(radius=1.2))

# Apply alpha mask
r, g, b, a = img.split()
result = Image.merge("RGBA", (r, g, b, feathered_mask))
result.save(output_path, "PNG")
print(f"Saved precision cutout to {output_path}")

