import json

file_path = r"D:\Amila\With Antigravity\DigyNex-Official\Job Finder\reports\WF ALL\DigyNex Commercial FB Automation - Updated.json"

with open(file_path, "r", encoding="utf-8") as f:
    wf = json.load(f)

for idx, node in enumerate(wf["nodes"]):
    if node["name"] == "Generate an image":
        # Replace Gemini Imagen with Pollinations AI HTTP Request
        wf["nodes"][idx] = {
            "parameters": {
                "method": "GET",
                "url": "={{ 'https://image.pollinations.ai/prompt/' + encodeURIComponent($node[\"Message a model\"].json.content.parts[0].text.split('###')[1].trim()) + '?width=1024&height=1024&nologo=true&seed=' + Math.floor(Math.random() * 1000000) }}",
                "authentication": "none",
                "sendBody": False,
                "options": {
                    "response": {
                        "response": {
                            "responseFormat": "file",
                            "outputPropertyName": "data"
                        }
                    }
                }
            },
            "id": node["id"],
            "name": "Generate an image",
            "type": "n8n-nodes-base.httpRequest",
            "typeVersion": 4.1,
            "position": node["position"]
        }

with open(file_path, "w", encoding="utf-8") as f:
    json.dump(wf, f, indent=2)

print("Successfully replaced Imagen with Pollinations AI in the updated workflow.")
