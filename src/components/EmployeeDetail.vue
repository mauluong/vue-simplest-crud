<template>
  <div class="single-product">
    <div v-if="loaded">
      <h3>Employee details</h3>
      <div class="card">
        <div class="card-header font-weight-bold">{{employeeName.toUpperCase()}}</div>
        <div class="card-body">
          <p>Employee ID: {{employeeId}}</p>
          <p>Employee Name: {{employeeName}}</p>
          <p>Department: {{employeeDep}}</p>
          <!-- <button class="btn btn-success">Add</button> -->
          <router-link :to="'/'" class="btn btn-primary">Back</router-link>
        </div>
      </div>
    </div>
    <div v-else>
      <h3>Loading...</h3>
    </div>
  </div>
</template>

<script>
import db from "@/firebase";
export default {
  name: "EmployeeDetail",
  data() {
    return {
      employeeId: "",
      employeeName: "",
      employeeDep: "",
      loaded: false
    };
  },
  beforeCreate() {
    // db.collection('products').where(doc.id, '==' this.$route.params.id).then(querySnapshot =>{
    //   const products = []
    //   const productsArray = []
    //   let i = 0
    //   querySnapshot.forEach((doc)=>{
    //     productsArray.push(doc.data())
    //     productsArray[i].id = doc.id
    //     products.push(productsArray[i])
    //     i++
    //   })
    //   this.products = products
    // })
    var docRef = db.collection("employees").doc(this.$route.params.id);
    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log("Document data:", doc.data().employee_id);
          this.employeeId = doc.data().employee_id;
          this.employeeName = doc.data().employee_fname + ' ' + doc.data().employee_lname;
          this.employeeDep = doc.data().employee_dep;
          this.loaded = true;
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  text-align: center;
  margin-top: 30px;
  margin-bottom: 20px;
}
</style>
