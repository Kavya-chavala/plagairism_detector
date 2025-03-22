// Upload files to the backend
function uploadFiles() {
    const fileInput = document.getElementById("fileInput");
    const files = fileInput.files;

    if (files.length === 0) {
        alert("Please upload at least one file.");
        return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append("submissions", files[i]);
    }

    fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById("uploadStatus").innerText = "✅ Files uploaded successfully!";
    })
    .catch(error => {
        document.getElementById("uploadStatus").innerText = "❌ Error uploading files!";
    });
}

// Run plagiarism check
function checkPlagiarism() {
    fetch("http://127.0.0.1:5000/check", {
        method: "GET",
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("checkStatus").innerText = "✅ Plagiarism check completed!";
        document.getElementById("reportFrame").src = "reports/plagiarism_report.csv";
    })
    .catch(error => {
        document.getElementById("checkStatus").innerText = "❌ Error running plagiarism check!";
    });
}