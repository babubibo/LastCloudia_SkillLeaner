var selectedSkills = []; // 儲存選擇的技能名稱
var totalSkillPoint = 0;

function moveToSelected(skillName, skillPoint) {
    // 判斷是否重複選取
    if (selectedSkills.includes(skillName)) {
        alert("已選取過" + skillName + "了");
        return;
    }

    // 創建新的一行
    var newRow = document.createElement("tr");
    var newCell = document.createElement("td");
    // newCell的文字為技能名稱
    newCell.textContent = skillName;

    // 新增刪除鍵
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "-";
    deleteButton.onclick = function () {
        deleteSelected(newRow, skillName);
    };
    // 將刪除鍵新增在技能名稱前
    newCell.insertBefore(deleteButton, newCell.firstChild);
    newRow.appendChild(newCell);

    // 將選擇技能新增到所選表格
    var selectedSkillsTable = document.getElementById("selectedSkills");
    selectedSkillsTable.querySelector("tbody").appendChild(newRow);

    selectedSkills.push(skillName);

    totalSkillPoint = totalSkillPoint + parseInt(skillPoint.trim());
    var totalScBox = document.getElementById("totalSc");

    totalScBox.textContent = totalSkillPoint;
}

function deleteSelected(row, skillName) {

    var index = selectedSkills.indexOf(skillName);
    if (index !== -1) {
        selectedSkills.splice(index, 1);
    }

    // 刪除以選擇的技能
    row.parentNode.removeChild(row);
}




