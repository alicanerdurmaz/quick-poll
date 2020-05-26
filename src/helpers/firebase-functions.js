export async function submitVoteToDb(firestore, firebasefirestore, selectedOptions, pollId, userId) {
  try {
    const docRef = firestore.collection('poll').doc(pollId)
    let batch = firestore.batch()

    typeof selectedOptions === 'object'
      ? selectedOptions.forEach((e) => {
          batch.update(docRef, {
            [e]: firebasefirestore.FieldValue.increment(1),
          })
        })
      : batch.update(docRef, {
          [selectedOptions]: firebasefirestore.FieldValue.increment(1),
        })

    await batch.commit()
    await docRef.collection('VotedUserList').doc(userId).set({ voted: 'true' })
  } catch (err) {
    console.log(err)
  }
}

export async function saveVoteToDb(firestore, firebasefirestore, pollObj) {
  let firebaseError = false
  let docPollRef

  const { pollSettings, optionList, question } = pollObj

  const filteredOptionList = optionList
    .filter((e) => e.text.length >= 1)
    .map((e) => {
      return e.text
    })

  const objToSend = {
    pollSettings,
    optionList: filteredOptionList,
    question,
    createdAt: firebasefirestore.FieldValue.serverTimestamp(),
  }

  optionList.forEach((e, i) => {
    objToSend[i] = 0
  })

  try {
    docPollRef = await firestore.collection('poll').add({
      ...objToSend,
    })
  } catch (err) {
    console.log(err.message)
    firebaseError = err.message
  }
  console.log(firebaseError)
  return { docPollRef, firebaseError }
}

export async function checkCurrentUserVote(firestore, pollId, userId) {
  const docRef = firestore.collection('poll').doc(pollId).collection('VotedUserList').doc(userId)
  const doc = await docRef.get()

  if (doc.exists) {
    return true
  } else if (!doc.exists) {
    return false
  } else {
    return null
  }
}
