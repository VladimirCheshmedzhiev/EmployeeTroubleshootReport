window.addEventListener('load', solution);
function solution() {
  const addBtn = document.getElementById('add-btn');
  const employeeInput = document.getElementById('employee');
  const categorySelect = document.getElementById('category')
  const urgencySelect = document.getElementById('urgency');
  const teamSelect = document.getElementById('team');
  const descriptionInput = document.getElementById('description');
  const previewList = document.querySelector('.preview-list')
  const pendingList = document.querySelector('.pending-list')
  const resolvedList = document.querySelector('.resolved-list');

  addBtn.addEventListener('click', () => {
    if (!employeeInput.value || !categorySelect.value || !urgencySelect.value || !teamSelect.value || !descriptionInput.value) {

      return;

    }

    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <h3>Employee: ${employeeInput.value}</h3>
      <p>Category: ${categorySelect.value}</p>
      <p>Urgency: ${urgencySelect.value}</p>
      <p>Assigned Team: ${teamSelect.value}</p>
      <p>Description: ${descriptionInput.value}</p>
      <button class="edit-btn">Edit</button>
      <button class="continue-btn">Continue</button>
    `;
    previewList.appendChild(listItem);

    employeeInput.value = '';
    categorySelect.value = '';
    urgencySelect.value = '';
    teamSelect.value = ''
    descriptionInput.value = '';
    addBtn.disabled = true;

    const editBtn = listItem.querySelector('.edit-btn');

    const continueBtn = listItem.querySelector('.continue-btn');

    editBtn.addEventListener('click', () => {

      const info = listItem.textContent;
      const [employee, category, urgency, team, description] = info
        .trim()
        .split('\n')
        .map((line) => line.trim());

      employeeInput.value = employee.substring(9);
      categorySelect.value = category.substring(9);
      urgencySelect.value = urgency.substring(8);
      teamSelect.value = team.substring(14);
      descriptionInput.value = description.substring(12);


      previewList.removeChild(listItem);


      addBtn.disabled = false;
    })

    continueBtn.addEventListener('click', () => {

      previewList.removeChild(listItem);

      const pendingItem = document.createElement('li');
      pendingItem.innerHTML = listItem.innerHTML

      const editBtnInPending = pendingItem.querySelector('.edit-btn');
      const continueBtnInPending = pendingItem.querySelector('.continue-btn')

      if (editBtnInPending) {
        editBtnInPending.remove();
      }
      if (continueBtnInPending) {
        continueBtnInPending.remove()
      }

      const resolveBtn = document.createElement('button');
      resolveBtn.className = 'resolve-btn';
      resolveBtn.textContent = 'Resolved';
      pendingItem.appendChild(resolveBtn);
      pendingList.appendChild(pendingItem);

      resolveBtn.addEventListener('click', () => {
        pendingList.removeChild(pendingItem);

        const resolvedItem = document.createElement('li');
        resolvedItem.innerHTML = listItem.innerHTML;

        const editBtnInResolved = resolvedItem.querySelector('.edit-btn');
        const continueBtnInResolved = resolvedItem.querySelector('.continue-btn');

        if (editBtnInResolved) {
          editBtnInResolved.remove();
        }
        if (continueBtnInResolved) {

          continueBtnInResolved.remove();
        }

        const clearBtn = document.createElement('button');
        clearBtn.className = 'clear-btn';
        clearBtn.textContent = 'Clear';
        resolvedItem.appendChild(clearBtn);
        resolvedList.appendChild(resolvedItem);

        clearBtn.addEventListener('click', () => {
          resolvedList.removeChild(resolvedItem);
        })
      })
    })
  })
}
