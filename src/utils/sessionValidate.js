export default function sessionValidate(formData) {
    let errors = {};

    if (!formData.game.trim()) {
        errors['game'] = 'Game is required!';
    }

    if (!formData.platform) {
        errors['platform'] = 'Platform is required!';
    }

    const slots = Number(formData.slots);

    if (formData.slots === '') {
        errors['slots'] = 'Slots are required!';
    } else if (!Number.isInteger(slots) || slots < 2 || slots > 8) {
        errors['slots'] = 'Slots must be a whole number between 2 and 8!';
    }

    return errors;
}
