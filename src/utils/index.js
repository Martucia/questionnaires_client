export const getConfig = () => {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    };

    return config;
};

export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('uk-UA', options);
    return formattedDate;
};
