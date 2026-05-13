import json

file_path = r"D:\Amila\With Antigravity\DigyNex-Official\Job Finder\reports\WF ALL\DigyNex Commercial FB Automation - Final.json"

with open(file_path, "r", encoding="utf-8") as f:
    wf = json.load(f)

for node in wf["nodes"]:
    # Fix Gemini Prompt
    if node["name"] == "Message a model":
        new_prompt = """Role: Strategic Social Media Manager for DigyNex.
Goal: Build long-term trust, technical authority, and strong brand presence as a premium Software Development, SaaS, and AI Automation agency. Target audience: Business owners, entrepreneurs, and senior professionals who need scalable software and automation.
Constraint: Keep it professional, premium, and value-driven.

1. THEME SELECTION (Logic):
Choose ONE theme randomly for each generation to ensure variety:
Theme 1: AI & Automation (Saving time, reducing costs with smart workflows, AI agents).
Theme 2: Custom SaaS Solutions (Building scalable web apps that solve real business problems).
Theme 3: Legacy System Modernization (Moving from old systems to modern, fast tech stacks).
Theme 4: Data & Business Intelligence (Making smart decisions using advanced dashboards).
Theme 5: Premium UI/UX & Web Dev (High-performance apps that convert users).
Theme 6: The DigyNex Approach (Our commitment to quality, security, and premium delivery).

2. CAPTION RULES (Output first):
- 4-5 short lines, engaging hook, professional yet approachable tone. Use 2-3 emojis.
- CTA: 👉 Elevate your business: digynex.se
- Hashtags: #SoftwareDevelopment #SaaS #AIAutomation #TechInnovation #DigyNex
- Separator: After hashtags add exactly: ###

3. IMAGE PROMPT RULES (Output after ###):
Anti-Repetition: Ensure the scene is completely unique each time.
Rotate Subjects: A focused CEO, a senior tech lead, an elegant analytics dashboard on a screen, a clean development environment, a modern tech meeting, or a sleek minimal workspace.
Rotate Environments: Modern glass office, premium home workspace, high-tech boardroom, minimal desk setup.
Style: High-quality professional photography, highly realistic, modern aesthetic. NO cyberpunk, NO sci-fi, NO neon. Clean, trustworthy, premium corporate or tech startup vibe.

OUTPUT FORMAT: Return ONLY the caption and image prompt separated by ###."""
        node["parameters"]["messages"]["values"][0]["content"] = new_prompt

    # Fix Telegram Button
    if node["name"] == "Telegram Approval Message":
        node["parameters"]["inlineKeyboard"] = {
            "rows": [
                {
                    "row": {
                        "buttons": [
                            {
                                "text": "✅ APPROVE",
                                "additionalFields": {
                                    "url": "={{ $execution.resumeUrl }}?action=approve"
                                }
                            },
                            {
                                "text": "❌ CANCEL",
                                "additionalFields": {
                                    "url": "={{ $execution.resumeUrl }}?action=cancel"
                                }
                            }
                        ]
                    }
                }
            ]
        }

    # Fix Wait Node Condition IF needed
    if node["name"] == "Approve or Cancel?":
        node["parameters"]["conditions"]["conditions"][0]["leftValue"] = "={{ $json.query.action }}"
        node["parameters"]["conditions"]["conditions"][0]["rightValue"] = "cancel"

new_file_path = r"D:\Amila\With Antigravity\DigyNex-Official\Job Finder\reports\WF ALL\DigyNex Commercial FB Automation - Updated.json"

with open(new_file_path, "w", encoding="utf-8") as f:
    json.dump(wf, f, indent=2)

print("Updated workflow saved to:", new_file_path)
