document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-btn');
    const contentSections = document.querySelectorAll('.content-section');

    function showSection(sectionId) {
        // Hide all sections
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Deactivate all nav buttons
        navButtons.forEach(btn => {
            btn.classList.remove('active');
        });

        // Show the target section and activate its button
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