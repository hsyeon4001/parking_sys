class ParkingMain {

    async showMain(res) {
        try {
            await res.render('main', { title: '주차장입니당' });
        }
        catch {            
            return await res.status(500).send(`
                <script>
                    alert('잠시 후 재시도 바랍니다.');
                    window.location.href = 'http://localhost:3001/';
                </script>
            `);
        }
    }

}

module.exports = ParkingMain;