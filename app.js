// Select elements
var resumeForm = document.getElementById('resume-form');
var resumeSection = document.getElementById('resume-section');
var resumeProfilePic = document.getElementById('resume-profile-pic');
var resumePersonalInfo = document.getElementById('resume-personal-info');
var resumeEducation = document.getElementById('resume-education');
var resumeWorkExperience = document.getElementById('resume-work-experience');
var resumeSkills = document.getElementById('resume-skills');
var profilePictureInput = document.getElementById('profilePicture');
// Function to update resume section dynamically
var updateResume = function (name, email, phone, education, workExperience, skills, profilePicUrl) {
    resumePersonalInfo.innerHTML = "<h3>".concat(name, "</h3><p>Email: ").concat(email, "</p><p>Phone: ").concat(phone, "</p>");
    resumeEducation.innerHTML = "<h3>Education</h3><p>".concat(education, "</p>");
    resumeWorkExperience.innerHTML = "<h3>Work Experience</h3><p>".concat(workExperience, "</p>");
    resumeSkills.innerHTML = "<h3>Skills</h3><ul>".concat(skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "</ul>");
    if (profilePicUrl) {
        resumeProfilePic.src = profilePicUrl;
        resumeProfilePic.style.display = 'block';
    }
};
// Form submission event listener
resumeForm.addEventListener('submit', function (event) {
    event.preventDefault();
    // Get form data
    var formData = new FormData(resumeForm);
    var name = formData.get('name');
    var email = formData.get('email');
    var phone = formData.get('phone');
    var education = formData.get('education');
    var workExperience = formData.get('workExperience');
    var skills = formData.get('skills').split(',');
    // Handle profile picture
    var profilePicUrl = null;
    var profilePictureFile = profilePictureInput.files ? profilePictureInput.files[0] : null;
    if (profilePictureFile) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            profilePicUrl = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            // Show resume section
            resumeSection.style.display = 'block';
            // Update resume with form data
            updateResume(name, email, phone, education, workExperience, skills, profilePicUrl);
        };
        reader.readAsDataURL(profilePictureFile);
    }
    else {
        // No profile picture selected
        profilePicUrl = null;
        resumeSection.style.display = 'block';
        updateResume(name, email, phone, education, workExperience, skills, profilePicUrl);
    }
});
// Editable resume sections (click to edit)
var makeEditable = function (element) {
    element.addEventListener('click', function () {
        var currentContent = element.innerText;
        var inputField = document.createElement('textarea');
        inputField.value = currentContent;
        element.innerHTML = '';
        element.appendChild(inputField);
        // Save changes on blur
        inputField.addEventListener('blur', function () {
            element.innerText = inputField.value;
        });
    });
};
// Make each section editable
makeEditable(resumePersonalInfo);
makeEditable(resumeEducation);
makeEditable(resumeWorkExperience);
makeEditable(resumeSkills);
// PDF and Share functionality
var downloadResumeBtn = document.getElementById('downloadResume');
var shareLinkBtn = document.getElementById('shareLink');
downloadResumeBtn.addEventListener('click', function () {
    window.print(); // Simple way to download resume as PDF
});
shareLinkBtn.addEventListener('click', function () {
    var username = document.getElementById('username').value;
    var url = "https://".concat(username, ".vercel.app/resume");
    alert("Share this link: ".concat(url));
});
