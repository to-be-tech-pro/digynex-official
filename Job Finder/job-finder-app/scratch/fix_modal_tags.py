
import re

file_path = r"d:\Amila\With Antigravity\DigyNex-Official\Job Finder\job-finder-app\src\App.vue"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Look for the specific block of closing tags after the Privacy Shield overlay
# and before the ExpertProfileWizard
pattern = r'(Sign In to Continue\s*</button>\s*</div>\s*</div>\s*</div>\s*</div>)\s*</div>(\s*</div>\s*</Transition>)'
new_content = re.sub(pattern, r'\1\2', content)

if content == new_content:
    print("No change made. Trying alternative pattern.")
    # Try a broader pattern near that area
    pattern2 = r'(v-if="!isAuthenticated".*?Sign In to Continue.*?)</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</Transition>'
    # Actually, let's just count the divs between !isAuthenticated and /Transition
    match = re.search(r'(v-if="!isAuthenticated".*?Sign In to Continue.*?)(</div>\s*){5,}', content, re.DOTALL)
    if match:
        full_block = match.group(0)
        # Replace 6 closing divs with 5 (or whatever is needed)
        # Let's be safer and just find the sequence directly
        pattern3 = r'(?<=Sign In to Continue</button>)\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*(?=</Transition>)'
        new_content = re.sub(pattern3, r'\n                        </div>\n                     </div>\n                 </div>\n             </div>\n          </div>\n       ', content)

if content != new_content:
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("File updated successfully.")
else:
    print("Failed to identify the block with regex.")
