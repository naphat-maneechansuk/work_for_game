import db from './conection'

//เช็คว่าใน databas
async function seedTitles() {
  const titles = [
    { id: 1, name: "นาย" },
    { id: 2, name: "นางสาว" },
  ];

  for (const title of titles) {
    await db.query(
      "INSERT IGNORE INTO titles (tit_id, tit_name) VALUES (?, ?)",
      [title.id, title.name]
    );
  }
}

function getTitleAll(){
    let results = db.query("select * from titles")
    return results;
}

function insertTitle( id:number, name:string){
    let results = db.query("insert into titles (tit_id, tit_name) values (?, ?)", [id, name])
    return results;
}

function getTitleById(id: number) {
    let results = db.query("select * from titles where tit_id = ?", [id]);
    return results;
}

function postTitle(id: number, name: string) {
    db.query("insert into titles (tit_id, tit_name) values (?, ?)", [id, name]);
}

function updateTitle(id: number, name: string) {
    db.query("update titles set tit_name = ? where tit_id = ?", [name, id]);
}

function deleteTitle(id: number) {
    db.query("delete from titles where tit_id = ?", [id]);
}

export default { getTitleAll, insertTitle, seedTitles, getTitleById, postTitle, updateTitle, deleteTitle };