const sheetId = "1RqroTRLngWNHFb90E2KeopAmN7UQGeAyC6zxm56upe0";
let apiKey = "Vm0weE5GbFdiRmRYV0d4VlYwZFNVRll3VlRGalJsWjBUVlpPVjJKSGVGbGFWV1JIVm1zeFYxTnNXbFpXZWtaSVZqQmFTMlJXUm5KYVJtUnBWMGRvVVZkV1pIcGxSa3BYVTJ4V1ZHSkhVbGhhVjNSYVpXeGFkRTFVVWxSTlJGWjZWakkxUzFReFduTmpSVGxhWWxob1RGbHFSbUZXVmtwMFVtMXdUbFp1UWpaWFZFSlhWakZaZVZOc2FHeFNiRXBoVmpCb1ExWXhjRmRYYkhCc1ZsUkdSbFZ0ZUU5VWJGcFlaSHBDVjJGcmEzaFZla1poVjBaT2MxWnNUbWxoTTBKdlZtMHhORk14UlhoalJtUllZa2RTVUZsclZURmxSbFpZWTNwR2FFMXNXbmhWVmxKV1VGRTlQUT09";
for(let i = 0; i < 8; i++) {
    apiKey = atob(apiKey);
}

const baseUrl = "https://sheets.googleapis.com";

let integer_id = 0;

const NUM_ROWS = 5;
const NUM_COLS = 5;

const getIntegerIDFromStringID = (string_id) => {
    let current_int_id = 0;
    [...string_id].forEach((c) => {
        current_int_id *= 62;
        if ("A" <= c && c <= "Z") { current_int_id += c.charCodeAt(0) - 65; }
        else if ("a" <= c && c <= "z") { current_int_id += c.charCodeAt(0) - 97 + 26; }
        else if ("0" <= c && c <= "9") { current_int_id += c.charCodeAt(0) - 48 + 52; }
    })
    return current_int_id;
}

const getMetaData = async() => {
    const metadata = await fetch(`${baseUrl}/v4/spreadsheets/${sheetId}/values/bingo_board_data_test!B2:C2?key=${apiKey}`);
    const json = await metadata.json();
    console.log(json);

    const id = json["values"][0][0]
    integer_id = getIntegerIDFromStringID(id)
}

const getSquareTextData = async() => {
    const square_texts = await fetch(`${baseUrl}/v4/spreadsheets/${sheetId}/values/bingo_board_data_test!B3:F7?key=${apiKey}`);
    const json = await square_texts.json();
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

const getFilledData = async() => {
    const square_statuses = await fetch(`${baseUrl}/v4/spreadsheets/${sheetId}/values/bingo_board_data_test!G3:K7?key=${apiKey}`);
    const json = await square_statuses.json();
    console.log(json);

    const bingo_board_div = document.getElementById("bingo_board_div");
    let row_index = 0;
    let col_index = 0;
    [...bingo_board_div.children].map((row) => {
        [...row.children].map((cell) => {
            if (json["values"][row_index][col_index] == "TRUE") {
                const seed = (integer_id + (row_index * NUM_COLS) + col_index) % 4294967296
                ranjs.core.seed(seed);
                const rng = ranjs.core.int(8);
                switch(rng) {
                    case 0:
                        cell.classList.remove("bg-white");
                        cell.classList.add("bg-red-300");
                        break;
                    case 1:
                        cell.classList.remove("bg-white");
                        cell.classList.add("bg-orange-300");
                        break;
                    case 2:
                        cell.classList.remove("bg-white");
                        cell.classList.add("bg-yellow-300");
                        break;
                    case 3:
                        cell.classList.remove("bg-white");
                        cell.classList.add("bg-green-300");
                        break;
                    case 4:
                        cell.classList.remove("bg-white");
                        cell.classList.add("bg-blue-300");
                        break;
                    case 5:
                        cell.classList.remove("bg-white");
                        cell.classList.add("bg-purple-300");
                        break;
                    case 6:
                        cell.classList.remove("bg-white");
                        cell.classList.add("bg-pink-300");
                        break;
                    case 7:
                        cell.classList.remove("bg-white");
                        cell.classList.add("bg-slate-300");
                        break;
                }
                
            }
            col_index += 1;
        })
        col_index = 0;
        row_index += 1;
    })
}


(async() => {
    await getMetaData()
    getSquareTextData()
    getFilledData()
})()

