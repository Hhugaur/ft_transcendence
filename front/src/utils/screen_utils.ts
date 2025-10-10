export function changingScreen(hasVar: boolean): void {
    if(hasVar == true)
    {
        document.body.classList.remove('bg-bg1');
        document.body.classList.add('bg-bg2');
    }
    else
    {
        document.body.classList.remove('bg-bg2');
        document.body.classList.add('bg-bg1');
    }
    document.body.classList.remove('fade-out');
    document.body.classList.add('fade-in');
}