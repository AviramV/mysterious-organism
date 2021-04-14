// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

// Create a factory function

function pAequorFactory(number, strandArray) {
  return {
    specimenNum: number,
    dna: strandArray,
// select random dna base and change it
    mutate () {
      const randomBaseIndex = Math.floor(Math.random() * 15);
      let randomBase = this.dna[randomBaseIndex];
      console.log(`at first: ${randomBase} @ ${randomBaseIndex}`);
      let randomChange = [];
      switch (randomBase) {
        case 'A':
          randomChange = ['T', 'C', 'G'];
          randomBase = randomChange[Math.floor(Math.random() * 3)];
          this.dna[randomBaseIndex] = randomBase;
          break
        case 'T':
          randomChange = ['A', 'C', 'G'];
          randomBase = randomChange[Math.floor(Math.random() * 3)];
          this.dna[randomBaseIndex] = randomBase;
          break
        case 'C':
          randomChange = ['A', 'T', 'G'];
          randomBase = randomChange[Math.floor(Math.random() * 3)];
          this.dna[randomBaseIndex] = randomBase;
          break
        case 'G':
          randomChange = ['A', 'C', 'T'];
          randomBase = randomChange[Math.floor(Math.random() * 3)];
          this.dna[randomBaseIndex] = randomBase;
          break

      }
      console.log(`and now: ${randomBase} @ ${randomBaseIndex}`)
      return this.dna;
    },

// compare two specimens and compute % of identical dna 
    compareDNA (specimenToCompare) {
      const totalCompared = 15;
      let areMatch = 0;
      for (let i = 0; i < totalCompared; i++) {
        if (this.dna[i] === specimenToCompare.dna[i]) {
          areMatch ++;
        }
      }
      const identicalPercentage = (areMatch / totalCompared) * 100;
      console.log(`specimen #${this.specimenNum} and specimen #${specimenToCompare.specimenNum} match ${areMatch}/${totalCompared} bases. That's ${identicalPercentage.toFixed(2)}% DNA in common.`);
    },

// return true if object’s DNA array contains min 60% 'C' or 'G' bases
    willLikelySurvive () {
      const countCandG = this.dna.filter(base => base === 'C' || base === 'G');
      const isMinSixtyPercent = countCandG.length / this.dna.length
      return isMinSixtyPercent >= 0.6;
    },

// Returns the complementary DNA strand. 
// 'A's match with 'T's and vice versa. 'C's match with
// 'G's and vice versa.
    complementStrand () {
      let compStrand = []; 
      this.dna.map(base => {        
        switch (base) {
          case 'A': compStrand.push('T');
          break
          case 'T': compStrand.push('A');
          break
          case 'C': compStrand.push('G');
          break
          case 'G': compStrand.push('C');
          break
          }
        });
      return compStrand;
    }
  } // End of returned object
} // End of factory function

// create 30 instances of pAequor that will likely survive

const instancesToStudy = [];
const createInstances = instancesAmount => {
  let counter = 1;
  let checkInstance;
  while (counter <= instancesAmount) {
    let checkInstance = pAequorFactory(counter, mockUpStrand());
    
    if (checkInstance.willLikelySurvive()) {
      instancesToStudy.push(checkInstance);
      counter++;
    }    
  }
  console.log(`Total created instances: ${instancesToStudy.length}`); 
  console.log(`All specimens are likely to survive? ${instancesToStudy.every(instance => instance.willLikelySurvive())}`
  );
  
  return instancesToStudy;
}

createInstances(30);


/*** Tests ***/ 
//const test = pAequorFactory(100, mockUpStrand());
//console.log(test.complementStrand())
//const test2 = pAequorFactory(2, mockUpStrand());
//console.log(test.dna);
//console.log(test.mutate());
//test.compareDNA(test2);
//console.log(`specimen #${test.specimenNum}'s DNA: ${test.dna}'`);
//console.log(`specimen #${test2.specimenNum}'s DNA: ${test2.dna}'`);
//console.log(test.willLikelySurvive());




