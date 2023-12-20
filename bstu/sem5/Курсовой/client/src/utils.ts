export const nameValidator = (name: string): boolean => {
    if (typeof name !== "string") return false;
    return name.length >= 3 && name.length <= 40
};

export const emailValidator = (email: string): boolean => {
    if (typeof email !== "string") return false;
    return email.length >= 9 && email.length <= 40 && email.includes('@') && email.includes('.com')
};

export const phoneValidator = (phone: string): boolean => {
    if (typeof phone !== "string") return false;
    return phone.length >= 13 && phone.length <= 15 && phone.charAt(0) === '+'
};

export const dateValidator = (date: string): boolean => {
    if (typeof date !== "string") return false;
    if (date.length !== 10) return false;
    try {
        const invalidDateString = new Date(date);
        return true;
    } catch (e) {
        return false
    }
};

export const fioValidator = (fio: string): boolean => {
    if (typeof fio !== "string") return false;
    return fio.split(' ').length === 3 && fio.length <= 40
};
