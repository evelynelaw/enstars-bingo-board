const sheetId = "1RqroTRLngWNHFb90E2KeopAmN7UQGeAyC6zxm56upe0"
let apiKey = "Vm0weE5GbFdiRmRYV0d4VlYwZFNVRll3VlRGalJsWjBUVlpPVjJKSGVGbGFWV1JIVm1zeFYxTnNXbFpXZWtaSVZqQmFTMlJXUm5KYVJtUnBWMGRvVVZkV1pIcGxSa3BYVTJ4V1ZHSkhVbGhhVjNSYVpXeGFkRTFVVWxSTlJGWjZWakkxUzFReFduTmpSVGxhWWxob1RGbHFSbUZXVmtwMFVtMXdUbFp1UWpaWFZFSlhWakZaZVZOc2FHeFNiRXBoVmpCb1ExWXhjRmRYYkhCc1ZsUkdSbFZ0ZUU5VWJGcFlaSHBDVjJGcmEzaFZla1poVjBaT2MxWnNUbWxoTTBKdlZtMHhORk14UlhoalJtUllZa2RTVUZsclZURmxSbFpZWTNwR2FFMXNXbmhWVmxKV1VGRTlQUT09";
for(let i = 0; i < 8; i++) {
    apiKey = atob(apiKey);
}


const baseUrl = "https://sheets.googleapis.com"

const getData = async() => {
    const response = await fetch(`${baseUrl}/v4/spreadsheets/${sheetId}/values/bingo_board_data!B2:F6?key=${apiKey}`);
    const json = await response.json();
    console.log(json);

    const bingo_board_div = document.getElementById("bingo_board_div");
    
    let row_index = 0;
    let col_index = 0;
    [...bingo_board_div.children].map((row) => {
        [...row.children].map((cell) => {
            cell.innerHTML = json["values"][row_index][col_index]
            col_index += 1;
        })
        col_index = 0;
        row_index += 1;
    })
}

getData()
