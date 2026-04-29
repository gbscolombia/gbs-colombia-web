"""One-shot content update for the v2 batch (products, industries, cases)."""
import json
import pathlib
import sys

sys.stdout.reconfigure(encoding="utf-8")
base = pathlib.Path("content")

# ---------------- BANDAS PESADAS — actualizar 3 imagenes
fp = base / "products/bandas-pesadas.json"
d = json.loads(fp.read_text(encoding="utf-8"))
img_map = {
    "banda-resistente-temperatura": "/images/products/banda-alta-temperatura.jpeg",
    "banda-resistente-impacto": "/images/products/resistente-impacto.jpeg",
    "banda-resistente-aceite-quimicos": "/images/products/quimicos-aceites.jpeg",
}
for p in d["products"]:
    if p["slug"] in img_map:
        p["image"] = img_map[p["slug"]]
fp.write_text(json.dumps(d, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("OK bandas-pesadas")

# ---------------- BANDAS LIVIANAS — re-imagenes + nuevo "Banda PU para alimentos"
fp = base / "products/bandas-livianas.json"
d = json.loads(fp.read_text(encoding="utf-8"))
img_map = {
    "banda-pu-termoplastica": "/images/products/banda-termoplastica.jpeg",
    "banda-pvc-industrial": "/images/products/banda-pvc.jpeg",
    "banda-modular-plastica": "/images/products/banda-modular.jpeg",
    "banda-silicona": "/images/products/industria-bebidas-lacteos.jpg",
    "malla-acero-inoxidable-sanitaria": "/images/products/malla-acero-inox.jpeg",
}
for p in d["products"]:
    if p["slug"] in img_map:
        p["image"] = img_map[p["slug"]]

new_pu_food = {
    "slug": "banda-pu-grado-alimenticio",
    "nameEs": "Banda PU Grado Alimenticio",
    "nameEn": "Food-Grade PU Belt",
    "shortDescEs": "Banda de poliuretano blanco con certificacion FDA 21 CFR para contacto directo con alimentos. Resistente a aceites, grasas y lavado intensivo CIP.",
    "shortDescEn": "White polyurethane belt certified FDA 21 CFR for direct food contact. Resistant to oils, fats and intensive CIP washing.",
    "fullDescEs": "Solucion sanitaria para procesamiento de carnicos, panificacion, frutas, vegetales y golosinas. Superficie homogenea sin tejidos expuestos que evita la proliferacion bacteriana, facil de limpiar y resistente a soluciones alcalinas y acidas usadas en lavado CIP. Compatible con normas FDA 21 CFR 177.2600 y EU 10/2011. Disponible en colores blanco, azul y verde para zonificacion HACCP.",
    "fullDescEn": "Sanitary solution for meat, bakery, fruit, vegetable and confectionery processing. Homogeneous surface with no exposed fabrics — prevents bacterial growth, easy to clean and resistant to alkaline and acidic CIP solutions. Complies with FDA 21 CFR 177.2600 and EU 10/2011. Available in white, blue and green for HACCP zoning.",
    "image": "/images/products/banda-pu.jpeg",
    "specs": {
        "material": "PU homogeneo grado alimenticio",
        "certifications": "FDA 21 CFR · EU 10/2011 · HACCP",
        "colors": "Blanco, azul, verde, transparente",
        "tempRange": "-20°C a +80°C",
        "thickness": "1.5 - 6 mm segun aplicacion",
    },
    "applications": ["panificacion", "carnicos", "frutas-vegetales", "farmaceutico"],
    "whatsappMsgEs": "Hola GBS, quiero cotizar la Banda PU Grado Alimenticio. Mi aplicacion es:",
    "whatsappMsgEn": "Hi GBS, I want to quote the Food-Grade PU Belt. My application is:",
}
slugs = [p["slug"] for p in d["products"]]
if "banda-pu-grado-alimenticio" not in slugs:
    idx = slugs.index("banda-pu-termoplastica") if "banda-pu-termoplastica" in slugs else 0
    d["products"].insert(idx + 1, new_pu_food)
fp.write_text(json.dumps(d, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("OK bandas-livianas (+ Banda PU Grado Alimenticio)")

# ---------------- COMPONENTES — quitar estructuras IP, anadir Variadores Emotron
fp = base / "products/componentes.json"
d = json.loads(fp.read_text(encoding="utf-8"))
img_map = {
    "rodillos-cema-serie-c-d-e": "/images/products/rodillos.jpg",
    "poleas-motrices-tensoras": "/images/products/polea-motriz.jpeg",
    "raspadores-primarios-secundarios": "/images/products/raspador.jpg",
    "faldones-guias-laterales": "/images/products/faldon.jpg",
}
for p in d["products"]:
    if p["slug"] in img_map:
        p["image"] = img_map[p["slug"]]
d["products"] = [p for p in d["products"] if p["slug"] != "estructuras-ip-atornilladas"]

emotron = {
    "slug": "variadores-velocidad-emotron",
    "nameEs": "Variadores de Velocidad Emotron",
    "nameEn": "Emotron Variable Frequency Drives",
    "shortDescEs": "Variadores de frecuencia (VFD) marca Emotron para arranque suave, control de torque y monitoreo de carga en transportadores y procesos industriales.",
    "shortDescEn": "Emotron variable frequency drives (VFD) for soft start, torque control and load monitoring on conveyors and industrial processes.",
    "fullDescEs": "Emotron, parte del grupo CG Drives & Automation (Suecia, hoy bajo Nidec ASI), es referente mundial en variadores de frecuencia con monitoreo de carga por shaft-power. Su tecnologia permite detectar atascos, bandas vacias, sobrecargas y desgaste mecanico antes de que generen una parada. GBS suministra, dimensiona y configura las series VFX, FDU y Emotron M20 para aplicaciones de mineria, cemento, agua, alimentos y manejo de materiales. Incluye protocolos Modbus, Profibus, Profinet y Ethernet/IP para integracion con SCADA y PLC.",
    "fullDescEn": "Emotron — part of CG Drives & Automation (Sweden, now under Nidec ASI) — is a global reference in variable frequency drives with shaft-power load monitoring. The technology detects blockages, empty belts, overloads and mechanical wear before they cause downtime. GBS supplies, sizes and configures the VFX, FDU and Emotron M20 series for mining, cement, water, food and material handling applications. Modbus, Profibus, Profinet and Ethernet/IP protocols are supported for SCADA / PLC integration.",
    "image": "/images/products/variador-emotron.jpg",
    "specs": {
        "brand": "Emotron (CG Drives & Automation / Nidec ASI)",
        "series": "VFX 2.0, FDU 2.0, Emotron M20",
        "powerRange": "0.37 kW - 3000 kW",
        "voltage": "220 / 380 / 440 / 690 V",
        "protection": "IP20 / IP54 / IP55 segun modelo",
        "comms": "Modbus RTU/TCP, Profibus, Profinet, Ethernet/IP, CANopen",
        "monitoring": "Shaft-power monitor (carga en linea, sin sensores externos)",
    },
    "applications": ["mineria", "cemento", "alimentos", "puertos", "agua"],
    "whatsappMsgEs": "Hola GBS, quiero cotizar Variador de velocidad Emotron. Mi motor es:",
    "whatsappMsgEn": "Hi GBS, I want to quote an Emotron variable frequency drive. My motor is:",
}
slugs = [p["slug"] for p in d["products"]]
if "variadores-velocidad-emotron" not in slugs:
    d["products"].append(emotron)
d["heroImage"] = "/images/products/rodillos.jpg"
fp.write_text(json.dumps(d, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("OK componentes (-IP atornilladas, +Variadores Emotron)")

# ---------------- SERVICIOS
fp = base / "products/servicios.json"
d = json.loads(fp.read_text(encoding="utf-8"))
img_map = {
    "empalmes-vulcanizados": "/images/team/empalme-vulcanizado.jpg",
    "empalmes-mecanicos": "/images/team/empalme-mecanico.png",
}
for p in d["products"]:
    if p["slug"] in img_map:
        p["image"] = img_map[p["slug"]]
fp.write_text(json.dumps(d, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("OK servicios")

# ---------------- INDUSTRIES
fp = base / "industries/industries.json"
d = json.loads(fp.read_text(encoding="utf-8"))
hero_map = {
    "mineria-agregados": "/images/industries/mineria-agregados.jpeg",
    "puertos": "/images/industries/port-coal.jpeg",
}
for ind in d["industries"]:
    if ind["slug"] in hero_map:
        ind["heroImage"] = hero_map[ind["slug"]]
fp.write_text(json.dumps(d, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("OK industries (mineria + puertos)")

# ---------------- CASES — copy edits
fp = base / "case-studies/case-studies.json"
d = json.loads(fp.read_text(encoding="utf-8"))
for case in d["cases"]:
    case["year"] = ""

    if case["slug"] == "puerto-transportador-altura":
        case["story"]["es"]["solution"] = case["story"]["es"]["solution"].replace(
            " Equipo GBS en sitio durante 36 horas ininterrumpidas.", ""
        )
        case["story"]["en"]["solution"] = case["story"]["en"]["solution"].replace(
            " GBS team on-site for 36 continuous hours.", ""
        )
        case["story"]["es"]["result"] = (
            "Banda operativa en tiempo record. Aumento de la vida util de la banda actual hasta en 3 anos. "
            "Cero paradas adicionales en los 18 meses posteriores. El cliente implemento mantenimiento "
            "preventivo basado en nuestras recomendaciones."
        )
        case["story"]["en"]["result"] = (
            "Belt operational in record time. Estimated service life extended by up to 3 additional years. "
            "Zero additional downtime in the following 18 months. Client adopted preventive maintenance "
            "based on our recommendations."
        )
        case["metrics"] = [
            {"label": {"es": "Vida util", "en": "Service life"}, "value": "+3 anos"},
            {"label": {"es": "Disponibilidad", "en": "Uptime"}, "value": "99.8%"},
            {"label": {"es": "Ahorro anual", "en": "Annual savings"}, "value": "USD 100K"},
        ]

    if case["slug"] == "ampliacion-planta-17-bandas":
        case["story"]["es"]["problem"] = case["story"]["es"]["problem"].replace(
            "Cronograma: 6 semanas.",
            "Cronograma exigente: 2 semanas para instalacion.",
        )
        case["story"]["en"]["problem"] = case["story"]["en"]["problem"].replace(
            "6-week timeline.",
            "Tight timeline: 2 weeks for installation.",
        )
        case["story"]["es"]["solution"] = case["story"]["es"]["solution"].replace(
            "Instalacion coordinada de 4 semanas",
            "Instalacion coordinada de 2 semanas",
        )
        case["story"]["en"]["solution"] = case["story"]["en"]["solution"].replace(
            "Coordinated 4-week installation",
            "Coordinated 2-week installation",
        )

fp.write_text(json.dumps(d, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("OK case-studies (copy edits)")

print("\nAll content updated.")
