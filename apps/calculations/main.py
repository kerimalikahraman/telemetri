import streamlit as st

st.set_page_config(layout="wide")

st.title("Mekanik Hesaplamalar")
st.write("Python tabanlı mühendislik araçları.")

st.sidebar.header("Araçlar")
tool = st.sidebar.radio("Seçiniz", ["Birim Çevirici", "Gerilme Analizi"])

if tool == "Birim Çevirici":
    st.header("Birim Çevirici")
    val = st.number_input("Değer", value=1.0)
    unit = st.selectbox("Birim", ["Metre -> Milimetre", "Inch -> Santimetre"])
    if unit == "Metre -> Milimetre":
        st.write(f"{val} m = {val * 1000} mm")
    else:
        st.write(f"{val} inch = {val * 2.54} cm")

elif tool == "Gerilme Analizi":
    st.header("Basit Gerilme Hesabı")
    force = st.number_input("Kuvvet (N)", value=1000.0)
    area = st.number_input("Alan (mm^2)", value=100.0)
    if area > 0:
        stress = force / area
        st.write(f"Gerilme: {stress} MPa")
    else:
        st.error("Alan 0 olamaz.")
