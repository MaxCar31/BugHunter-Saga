import os
from pathlib import Path

def generate_tree_with_content(root_path: Path, output_file: Path):
    """
    Genera un archivo de texto con la estructura de directorios y, por separado,
    el contenido de los archivos .java, manteniendo un orden consistente.
    """
    tree_lines = []
    content_blocks = []

    # Lista para mantener el orden correcto de los archivos encontrados
    ordered_files = []

    # --- RECOLECCIÓN DE DATOS (UNA SOLA PASADA CON OS.WALK) ---
    for root_str, dirs, files in os.walk(root_path):
        # Ordenamos directorios y archivos para un resultado consistente
        dirs.sort()
        files.sort()

        current_root = Path(root_str)
        level = len(current_root.relative_to(root_path).parts)
        indent = '│   ' * level

        if level > 0:
            tree_lines.append(f"{indent}├── 📁 {current_root.name}/\n")

        sub_indent = '│   ' * (level + 1)
        for file_name in files:
            if file_name.endswith(('.java', '.sql')):
                file_path = current_root / file_name
                tree_lines.append(f"{sub_indent}├── 📄 {file_name}\n")
                # Guardamos la ruta del archivo en el orden en que lo encontramos
                ordered_files.append(file_path)

    # --- GENERACIÓN DEL CONTENIDO EN EL ORDEN CORRECTO ---
    for file_path in ordered_files:
        relative_path = file_path.relative_to(root_path)
        try:
            content = file_path.read_text(encoding='utf-8', errors='ignore')
            content_blocks.append(f"\n\n{'=' * 80}\n")
            content_blocks.append(f"📄 CONTENIDO DE: {relative_path}\n")
            content_blocks.append(f"{'=' * 80}\n")
            content_blocks.append(content)
        except Exception as e:
            content_blocks.append(f"\n\n{'=' * 80}\n")
            content_blocks.append(f"❌ ERROR al leer {relative_path}: {e}\n")
            content_blocks.append(f"{'=' * 80}\n")

    # --- ESCRITURA FINAL EN EL ARCHIVO ---
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(f"Árbol de archivos del directorio: {root_path.name}\n")
        f.write("=" * 80 + "\n\n")
        f.write("## 🌳 ESTRUCTURA DE ARCHIVOS\n\n")
        f.writelines(tree_lines)

        f.write("\n\n" + "=" * 80 + "\n")
        f.write("## 📄 CONTENIDO DETALLADO DE ARCHIVOS\n")
        f.write("=" * 80)
        f.writelines(content_blocks)

if __name__ == "__main__":
    current_dir = Path(__file__).parent.resolve()
    output_file = current_dir / f"arbol_ordenado_{current_dir.name}.txt"

    print(f"📂 Directorio actual a escanear: {current_dir}")
    print(f"🔍 Buscando archivos .java...")
    print(f"📝 Generando árbol y contenido en '{output_file}'...")

    generate_tree_with_content(current_dir, output_file)

    print(f"✅ Archivo generado exitosamente en '{output_file}'")