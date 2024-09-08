// Select elements
const resumeForm = document.getElementById('resume-form') as HTMLFormElement;
const resumeSection = document.getElementById('resume-section') as HTMLElement;
const resumeProfilePic = document.getElementById('resume-profile-pic') as HTMLImageElement;
const resumePersonalInfo = document.getElementById('resume-personal-info') as HTMLElement;
const resumeEducation = document.getElementById('resume-education') as HTMLElement;
const resumeWorkExperience = document.getElementById('resume-work-experience') as HTMLElement;
const resumeSkills = document.getElementById('resume-skills') as HTMLElement;
const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;

// Function to update resume section dynamically
const updateResume = (
  name: string, 
  email: string, 
  phone: string, 
  education: string, 
  workExperience: string, 
  skills: string[], 
  profilePicUrl: string | null
) => {
    resumePersonalInfo.innerHTML = `<h3>${name}</h3><p>Email: ${email}</p><p>Phone: ${phone}</p>`;
    resumeEducation.innerHTML = `<h3>Education</h3><p>${education}</p>`;
    resumeWorkExperience.innerHTML = `<h3>Work Experience</h3><p>${workExperience}</p>`;
    resumeSkills.innerHTML = `<h3>Skills</h3><ul>${skills.map(skill => `<li>${skill}</li>`).join('')}</ul>`;

    if (profilePicUrl) {
        resumeProfilePic.src = profilePicUrl;
        resumeProfilePic.style.display = 'block';
    }
};

// Form submission event listener
resumeForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get form data
    const formData = new FormData(resumeForm);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const education = formData.get('education') as string;
    const workExperience = formData.get('workExperience') as string;
    const skills = (formData.get('skills') as string).split(',');

    // Handle profile picture
    let profilePicUrl = null;
    const profilePictureFile = profilePictureInput.files ? profilePictureInput.files[0] : null;

    if (profilePictureFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            profilePicUrl = e.target?.result as null;
            // Show resume section
            resumeSection.style.display = 'block';

            // Update resume with form data
            updateResume(name, email, phone, education, workExperience, skills, profilePicUrl);
        };
        reader.readAsDataURL(profilePictureFile);
    } else {
        // No profile picture selected
        profilePicUrl = null;
        resumeSection.style.display = 'block';
        updateResume(name, email, phone, education, workExperience, skills, profilePicUrl);
    }
});

// Editable resume sections (click to edit)
const makeEditable = (element: HTMLElement) => {
    element.addEventListener('click', () => {
        const currentContent = element.innerText;
        const inputField = document.createElement('textarea');
        inputField.value = currentContent;
        element.innerHTML = '';
        element.appendChild(inputField);

        // Save changes on blur
        inputField.addEventListener('blur', () => {
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
const downloadResumeBtn = document.getElementById('downloadResume') as HTMLButtonElement;
const shareLinkBtn = document.getElementById('shareLink') as HTMLButtonElement;

downloadResumeBtn.addEventListener('click', () => {
    window.print(); // Simple way to download resume as PDF
});

shareLinkBtn.addEventListener('click', () => {
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const url = `https://${username}.vercel.app/resume`;
    alert(`Share this link: ${url}`);
});
