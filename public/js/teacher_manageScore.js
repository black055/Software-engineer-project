document.getElementById('select_classes').addEventListener('change', handleChange, true);

function handleChange(e) {
    e.preventDefault();
    e.stopPropagation();
    window.location = `/teachers/manage_score/${e.currentTarget.value}`;
}