# Welcome to NeuroTrack
Sruthi Magesh, Summer Royal, Radia, Apurva Varigonda
[HACKMIT 2024!
](https://docs.google.com/presentation/d/1vAqJlq8ozkZ46ohe_X-e6_qf_YDOPL6eEuw9ix7VCl0/edit?usp=sharing)

NeuroTrack created a computational algortithm to perform a content-agnostic analysis of the timing of pressing and releasing keystrokes during a controlled series of trials. Combining this information with the patient's medical record, we were able to use machine learning to identify biomarkers of functional impairments in motor development and cognition. A decline in motor function and congition can be an indicator of neurodegenrative disease progression.

- Our website App facilitates user (doctors) login, adding of patients, dispensing tests, and summary analysis of patient healthcare.
- The arduino LED tests (public/Arduino) through 10 rounds of flashing lights random between left and right, the testtaker will press the button nearest the lit-up led and the time it from light to press and the length of button holding are both measured. These values will be stored and used to monitor patient status over time as well as diagnose with potential Parkinsons conditions.
- The naive bayes classification model (public/ML_classification) is trained on patient data and keyboard reaction times that will evenually be implemented into the website.

