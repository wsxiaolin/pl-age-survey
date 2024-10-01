const pl = require("physics-lab-web-api");
const fs = require("fs")
const user = new pl.User();

async function main() {
    await user.auth.login();
    const l1 = await user.messages.get(
        "66dd3d6b6d0dcacffea3de7d",
        "Discussion",
        100
    );

    const l2 = await user.messages.get(
        "66dd3d6b6d0dcacffea3de7d",
        "Discussion",
        100,
        l1.Data.Comments[l1.Data.Comments.length - 1].ID
    );
    l2.Data.Comments.shift();
    const list = [...l1.Data.Comments, ...l2.Data.Comments];
    const re = list.map((i) => {
        return (i.Verification ? i.Verification : 'Normal') + ":" + i.Content
    })
    fs.writeFileSync("result.txt", re.join("\n"))
}

main();
