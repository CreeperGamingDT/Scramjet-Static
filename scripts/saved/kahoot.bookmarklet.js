fetch(`https://create.kahoot.it/rest/kahoots/${prompt("Paste the Kahoot ID")}/card/?includeKahoot=true`)
  .then(res => res.json())
  .then(json =>
    json.kahoot.questions
      .map((q, number) => {
        const { choices } = q;
        for (let i = 0; i < choices.length; i++) {
          if (choices[i].correct) {
            switch (i) {
              case 0:
                return `Q${number + 1} ${choices.length == 2?"[True/False]: blue diamond": "[Multiple Choice] red triangle"} - ${choices[i].answer}`;
                break;
              case 1:
                return `Q${number + 1}${choices.length == 2?"[True/False]: red triangle": "[Multiple Choice] blue diamond"} - ${choices[i].answer}`;
                break;
              case 2:
                return `Q${number + 1} [Multiple Choice]: yellow circle - ${choices[i].answer}`;
                break;
              case 3:
                return `Q${number + 1} [Multiple Choice]: green square - ${choices[i].answer}`;
                break;
            }
          }
        }
      })
      .join("\n")
  )
  .then(answers => open().document.body.innerText = answers);
