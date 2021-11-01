class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
   // Adds the vampire as an offspring of this vampire
   addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
    console.log("Added offspring", {vampire}, "to ", this);
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    const ancestors = this.getAllAncestors();
    return ancestors.length - 1;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    const curRank = this.numberOfVampiresFromOriginal;
    const vampRank = vampire.numberOfVampiresFromOriginal;
    return (curRank < vampRank);
  }

  getAllAncestors() {
    let curAncestors = [];
    for(let cur = this; (cur); cur = cur.creator) {
      curAncestors.push(cur);
    }
    console.log({curAncestors});
    return curAncestors;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    console.log("Find ", name, " under ", this);
    if (!name) {
      console.log("Invalid name: ", name);
      return null;
    }

    if (name === this.name) {
      console.log(name, " Found !!! : ", this);
      return this;
    }

    for (const child of this.offspring) {
      if (name === child.name) {
        console.log(name, " Found !!! : ", child);
        return child;
      }
      console.log("Trying subtree of child: ", child);
      let nodeFound = child.vampireWithName(name);
      if (nodeFound) {
        console.log(name, " Found !!! : ", nodeFound, " under ", child);
        // pop out the found node for given name
        return nodeFound;
      }
      console.log("finished search in subtree of child: ", child);
    }

    console.log("finished search in subtree of node: ", this);
    // did not find name in the whole tree
    // of this as root so return null
    console.log(name, " Not Found, returning null !!");
    return null;
  }



  // Returns the total number of vampires that exist
  get totalDescendents() {
    let descendants = this.getAlllDescendants();
    console.log(this, " total descendants: ", descendants);
    return descendants.length;
  }

  getAlllDescendants() {
    let descendants = [];
    this.fillAllDescendants(descendants);
    console.log(this, " has descendants: ", descendants);
    return descendants;
  }

  fillAllDescendants(descendants) {
    for (const child of this.offspring) {
      console.log("Add descendant child: ", child, " of node :", this);
      descendants.push(child);
      console.log("fill descendants of child: ", child, " of node: ", this);
      child.fillAllDescendants(descendants);
      console.log("Finished filling descendants of child: ", child, " of node: ", this);
    }
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millennials = [];
    if (this.yearConverted > 1979) {
      millennials.push(this);
    }
    let descendants = this.getAlllDescendants();
    for (const child of descendants) {
      if (child.yearConverted > 1979) {
        millennials.push(child);
      }
    }
    return millennials;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common ancestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common ancestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common ancestor.
  getAllAncestors() {
    let curAncestors = [];
    for(let cur = this; (cur); cur = cur.creator) {
      curAncestors.push(cur);
    }
    console.log({curAncestors});
    return curAncestors;
  }

  closestCommonAncestor(vampire) {
    let curAncestors = this.getAllAncestors();
    let vampAncestors = vampire.getAllAncestors();
    for(const curAncestor of curAncestors) {
      if(!curAncestor) return;
      for (const vampAncestor of vampAncestors) {
        if (!vampAncestor) return;
        if (curAncestor.name === vampAncestor.name) {
          console.log("Closest common ancestor of ", this, " and ", vampire, " is ", curAncestor);
          return curAncestor;
        }
      }
    }

  }
}

module.exports = Vampire;

