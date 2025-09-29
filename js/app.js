document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-btn');
    const contentSections = document.querySelectorAll('.content-section');

    function showSection(sectionId) {
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        
        navButtons.forEach(btn => {
            btn.classList.remove('active');
        });

        document.getElementById(sectionId).classList.add('active');
        document.getElementById(`nav-${sectionId.split('-')[0]}`).classList.add('active');
    }

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sectionName = button.id.split('-')[1];
            showSection(`${sectionName}-section`);
        });
    });
});