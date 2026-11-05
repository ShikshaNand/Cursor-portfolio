import cv2
import numpy as np
import os
import glob

cert_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "Asset", "img", "certificates"))
files = glob.glob(os.path.join(cert_dir, "*.png"))

for f in files:
    img = cv2.imread(f)
    if img is None:
        continue
    h, w = img.shape[:2]
    
    # Check if this is a Chrome PDF viewer screenshot
    # The top bar is around y: 0 to 50, dark background is RGB around (40-60, 40-60, 40-60)
    # The sidebar is on the left
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Chrome PDF viewer background is typically around gray values 40-60
    # The certificate page has bright areas (white/light colors)
    # Let's threshold at gray > 100
    _, thresh = cv2.threshold(gray, 90, 255, cv2.THRESH_BINARY)
    
    # Find contours
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    # Find the largest contour with area > 100000
    best_rect = None
    max_area = 0
    for cnt in contours:
        x, y, cw, ch = cv2.boundingRect(cnt)
        area = cw * ch
        # We want the main certificate sheet, not small icons
        if area > max_area and cw > 400 and ch > 300:
            # Avoid the entire screen
            if cw < w - 20 or ch < h - 20:
                max_area = area
                best_rect = (x, y, cw, ch)
    
    if best_rect:
        x, y, cw, ch = best_rect
        # Give a small 2px margin inside if possible to avoid border artifacts
        cropped = img[y:y+ch, x:x+cw]
        cv2.imwrite(f, cropped)
        print(f"[OK] Cropped {os.path.basename(f)}: ({cw}x{ch})")
    else:
        print(f"Skipped {os.path.basename(f)} (no distinct rect found)")
