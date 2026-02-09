import re
import sys
import traceback

output_file_path = "C:/project/travel-record-frontend/.gemini-clipboard/transformed_svg.txt"
error_file_path = "C:/project/travel-record-frontend/.gemini-clipboard/transform_svg_error.log"

try:
    svg_content = sys.stdin.read()

    # 1. Modify the main <svg> tag for responsiveness and React inline style.
    svg_content = re.sub(
        r'style="enable-background:new 0 0 \d+\.?\d* \d+\.?\d*";"',
        r'style={{ width: \'100%\', height: \'auto\' }}',
        svg_content,
        1
    )

    # 2. Add onClick to paths/polygons
    def add_onclick(match):
        element_type = match.group(1)
        attributes = match.group(2)
        closing_tag_full = match.group(3)

        id_match = re.search(r'id="([^"]+)"', attributes)
        if id_match:
            region_name = id_match.group(1)
            region_name_escaped = region_name.replace("'", "\'")
            
            new_attributes = f'{attributes} onClick={{() => handleRegionClick(\'{region_name_escaped}\')}}'
            return f'<{element_type}{new_attributes}{closing_tag_full}'
        return match.group(0)

    # Regex to handle self-closing and non-self-closing tags.
    # It ensures that content between > and <//1> is not greedily matched across multiple elements.
    # (?s) enables DOTALL mode for the inner non-greedy match.
    svg_content = re.sub(r'(?s)<(path|polygon)(\s+[^>]*)((?:\/>)|(?:>(?:(?!<\/\1>).)*<\/\1>))', add_onclick, svg_content)


    # Replace class with className for React
    svg_content = svg_content.replace('class="st0"', 'className="st0"')
    svg_content = svg_content.replace('class="st1"', 'className="st1"')

    with open(output_file_path, "w", encoding="utf-8") as f:
        f.write(svg_content)

except Exception as e:
    with open(error_file_path, "w", encoding="utf-8") as f:
        f.write(f"An error occurred: {e}\n")
        traceback.print_exc(file=f)
    sys.exit(1)
