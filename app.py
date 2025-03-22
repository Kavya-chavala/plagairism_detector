import sys
print(sys.version)
import streamlit as st
import pandas as pd
import gdown
import os

st.title("AI-Based Plagiarism Detection System")
st.sidebar.header("Upload Submissions")

# Upload multiple files
uploaded_files = st.sidebar.file_uploader("Upload student submissions", type=["txt"], accept_multiple_files=True)

# Save files to local directory
if uploaded_files:
    for uploaded_file in uploaded_files:
        with open(f"submissions/{uploaded_file.name}", "wb") as f:
            f.write(uploaded_file.getbuffer())
    st.sidebar.success("Files uploaded successfully!")

# Check plagiarism and display results
if st.button("Check Plagiarism"):
    # Run plagiarism checking script
    os.system("python ../backend/plagiarism_detector.py")

    # Display report
    report_path = "../data/reports/plagiarism_report.csv"
    if os.path.exists(report_path):
        df = pd.read_csv(report_path)
        st.write("### Plagiarism Report")
        st.dataframe(df)
    else:
        st.error("No report found! Check backend.")