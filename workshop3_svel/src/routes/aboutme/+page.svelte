<!--
ให้นิสิตสร้าง frontend sveltekits ให้มีความสามารถคือ
1. รับค่า input ตัวเลขจากผู้ใช เพื่อเป็นแม่สูตรคุณ
2. มีปุ่มสำหรับสร้างตารางสูตรคูณ
3. แสดงข้อมูลสูตรคูณ
4. ตกแต่งให้สวยงาม
-->
<script lang="ts">
  let number = 1;
  let timesTable: { multiplier: number; result: number }[] = [];

  function generateTimesTable() {
    timesTable = [];
    for (let i = 1; i <= 12; i++) {
      timesTable.push({ multiplier: i, result: number * i });
    }
  }
</script>

<h1>ตารางสูตรคูณ</h1>
<input type="text" bind:value={number} />
<button on:click={generateTimesTable}>สร้างตารางสูตรคูณ</button>
<table>
  <thead>
    <tr>
      <th>Multiplier</th>
      <th>Result</th>
    </tr>
  </thead>
  <tbody>
    {#each timesTable as row}
      <tr>
        <td>{row.multiplier}</td>
        <td>{row.result}</td>
      </tr>
    {/each}
  </tbody>
</table>
<style>
  h1 {
    color: #2c3e50;
  }
  input {
    margin-right: 10px;
    padding: 5px;
    font-size: 16px;
  }
  button {
    padding: 5px 10px;
    font-size: 16px;
    background-color: #3498db;
    color: white;
    border: none;
    cursor: pointer;
  }
  button:hover {
    background-color: #2980b9;
  }
  table {
    width: 50%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  th {
    background-color: #f2f2f2;
  }
</style>