const isInThePast = (line) => {
  const [days, month, year] = line.children[1].textContent.split(' ')
  const date = new Date(`${days.split('-')[0]} ${month} 20${year}`)
  return date < new Date()
}

const table = document.getElementsByTagName('table')[1]

const tbody = table.children[2]
for (const line of tbody.children) {
  if (isInThePast(line)) {
    line.classList.add('inThePast')
  }
  if (line.children[4].textContent === 'LISTE ATTENTE') {
    line.classList.add('waitingList')
  }
  if (line.children[4].textContent === 'TMP') {
    line.classList.add('tmp')
  }
  if (line.children[4].textContent === 'CONFIRME') {
    line.classList.add('confirmed')
  }
}