import cv2
import numpy as np
from PIL import Image

src_path = r"C:\Users\Anand\.gemini\antigravity\brain\7651f15c-43b9-438c-9a84-d0f614e2654a\shikshanand_portrait_white_bg_smile_1793756567889.jpg"
out_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "Asset", "img", "shikshanand-portrait.png"))

# Read image
img_bgr = cv2.imread(src_path)
h, w = img_bgr.shape[:2]
print(f"Original shape: {w}x{h}")

target_w, target_h = 1024, 1536
img_resized = cv2.resize(img_bgr, (target_w, target_h), interpolation=cv2.INTER_LANCZOS4)
img_rgb = cv2.cvtColor(img_resized, cv2.COLOR_BGR2RGB)

# Identify white background pixels
# Notice the background is pure white (R > 235, G > 235, B > 235) and low saturation
r = img_rgb[:, :, 0].astype(np.int32)
g = img_rgb[:, :, 1].astype(np.int32)
b = img_rgb[:, :, 2].astype(np.int32)

diff_rg = np.abs(r - g)
diff_rb = np.abs(r - b)
diff_gb = np.abs(g - b)
is_neutral = (diff_rg < 22) & (diff_rb < 22) & (diff_gb < 22)
is_bright = (r > 232) & (g > 232) & (b > 232)
is_bg = is_neutral & is_bright

# Flood fill / connected components from corners
bg_seed_mask = np.zeros((target_h, target_w), np.uint8)
bg_seed_mask[is_bg] = 255

num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(bg_seed_mask)
bg_label_mask = np.zeros((target_h, target_w), dtype=bool)

# Labels connecting to top/left/right border areas
border_labels = set()
for x in [5, target_w // 2, target_w - 6]:
    border_labels.add(labels[5, x])
for y in range(0, target_h, 50):
    border_labels.add(labels[y, 5])
    border_labels.add(labels[y, target_w - 6])

border_labels.discard(0)
for lbl in border_labels:
    bg_label_mask |= (labels == lbl)

# Smooth alpha mask
alpha = np.ones((target_h, target_w), dtype=np.float32) * 255.0
alpha[bg_label_mask] = 0.0

# Refine hair and edge transition
# Dilate background mask slightly to get transition boundary
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
alpha_blurred = cv2.GaussianBlur(alpha, (5, 5), 0)

# Build RGBA
rgba = np.dstack((img_rgb, alpha_blurred.astype(np.uint8)))

# Save PNG
pil_img = Image.fromarray(rgba)
pil_img.save(out_path, format="PNG", optimize=True)

# Also update renando-portrait.png for backwards compatibility if needed
pil_img.save(out_path, format="PNG", optimize=True)

print(f"Successfully generated transparent portrait: {out_path} ({target_w}x{target_h})")
