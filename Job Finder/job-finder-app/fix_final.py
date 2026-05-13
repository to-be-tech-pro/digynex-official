import json

file_path = r"D:\Amila\With Antigravity\DigyNex-Official\Job Finder\reports\WF ALL\DigyNex Commercial FB Automation - Final.json"

with open(file_path, "r", encoding="utf-8") as f:
    wf = json.load(f)

for node in wf["nodes"]:
    # Update the Gemini Text Prompt with the Ultimate Master Prompt
    if node["name"] == "Message a model":
        new_prompt = """Role: Strategic Tech & Automation Manager for DigyNex, Gothenburg.
Goal: Position DigyNex as the #1 Premium Tech Partner for businesses. Focus on scaling via Custom SaaS, Automation, and the 360 Ecosystem.
Constraint: Strictly DO NOT mention RUT-avdrag. Focus on business value (ROI, time saved) rather than overly complex jargon.

1. CONTENT ROTATION (Selection Logic):
You are generating one of our 3 daily posts. Choose ONE theme randomly for this generation to ensure maximum variety:

Theme 1: Business Automation & AI (n8n workflows, AI agents, replacing manual data entry, saving 20+ hours/week).
Theme 2: Custom SaaS & Web Apps (Building scalable, tailored software to replace messy Excel sheets).
Theme 3: DigyNex 360 Ecosystem (Our custom TMS/CMS—controlling a whole business from one unified dashboard).
Theme 4: Premium UI/UX & Web Dev (High-converting landing pages, seamless user experiences, modern design).
Theme 5: Data & Business Intelligence (Clean analytics dashboards for smart CEO decision-making).
Theme 6: Legacy System Upgrades (Moving from slow, outdated systems to lightning-fast modern tech stacks).
Theme 7: Modern Infrastructure & IT (Smart office setups, surgical cable management, reliable networking).
Theme 8: The DigyNex Standard (Bank-level security, AWS deployment, clean code, preventative tech support).

2. OUTPUT STRUCTURE (Strictly follow this):

English Body (Main): 5-7 lines. High authority, professional yet friendly. Focus heavily on the benefit (ROI, scaling). Use 2-3 emojis.

Swedish Summary: 2-3 lines. A punchy, localized summary for the Gothenburg/Sweden vibe.

CTA: 👉 Scale your business today: digynex.se

Hashtags: #Gothenburg #DigyNex #BusinessAutomation #SaaS #SwedenTech #WebDevelopment

Separator: After hashtags add exactly: ###

3. IMAGE PROMPT RULES (After ###):

Atmosphere: High-end professional corporate photography, natural Scandinavian daylight, minimalist "Svensk design" interiors. Premium and trustworthy.

Visual Variety (Rotate randomly):
Scene A: A clean office desk with a laptop showing a complex automation workflow (n8n style).
Scene B: A focused Startup Founder or Tech Lead reviewing a beautiful analytics dashboard on a tablet.
Scene C: A minimalist glass-walled boardroom mapping out software architecture on a whiteboard.
Scene D: A tech expert doing "surgical" clean networking/cable setup in a modern office.
Scene E: A sleek monitor showing clean code in a cozy premium Gothenburg café.

Branding: Subtly place "DigyNex" logo on a coffee mug, laptop lid, technician's polo shirt, or wall sign.

Anti-Repetition: Do NOT show generic "Man in a suit pointing at a glowing hologram graph". Avoid broken screens. Focus exclusively on "Active Growth" and "Clean Tech".

OUTPUT FORMAT: Return ONLY the text content and the image prompt separated by ###."""
        node["parameters"]["messages"]["values"][0]["content"] = new_prompt

    # Fix the Telegram Approval buttons to use URL instead of callback_data
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

    # Fix the Wait condition to match the URL query parameter
    if node["name"] == "Approve or Cancel?":
        node["parameters"]["conditions"]["conditions"][0]["leftValue"] = "={{ $json.query.action }}"

new_file_path = r"D:\Amila\With Antigravity\DigyNex-Official\Job Finder\reports\WF ALL\DigyNex Commercial FB Automation - Final_Fixed.json"

with open(new_file_path, "w", encoding="utf-8") as f:
    json.dump(wf, f, indent=2)

print("Final workflow with Gemini Image and Fixed prompt saved.")
