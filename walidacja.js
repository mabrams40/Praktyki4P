function validate(form)
{
    let str = form.firstname.value;
    if(str.length < 3 || str.length > 15)
    {
        alert('Pole imię musi zawierać od 3 do 15 znaków.');
        return;
    }

    str = form.lastname.value;
    if(str.length < 3 || str.length > 15)
    {
        alert('Pole nazwisko musi zawierać od 3 do 15 znaków.');
        return;
    }

    if(form.birthday.value == "")
    {
        alert('Wprowadź datę.');
        return;
    }

    let now = new Date();
    let year = form.birthday.value.split('-')[0];
    let month = form.birthday.value.split('-')[1];
    let day = form.birthday.value.split('-')[2];

    if(year < 1900){
        alert('Błędny rok.');
        return;
    }

    if(year > now.getFullYear()) {
        alert('Błędny rok.');
        return;
    }
    else if(year == now.getFullYear()){
        if(month > now.getMonth()+1){
            alert('Błędny miesiąc.');
            return;
        }
        else if(month == now.getMonth()+1){
            if(day > now.getDate()){
                alert('Błędny dzień.');
                return;
            }
        }
    }

    alert('Pomyślnie wysłano aplikację!');
}