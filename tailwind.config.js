/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
        "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
        "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
            aspectRatio: {
                "4/3": "4 / 3",
                "16/9": "16 / 9",
                "21/9": "21 / 9"
            }
        },
        fontFamily: {
            sans: ["Satoshi Medium", "sans-serif"]
        }
    },
    plugins: [require("flowbite/plugin")]
});
