<template>
  <div class="products">
    <h3>Employees</h3>
    <div class="card">
      <div class="card-header">Add a new employee</div>
      <div class="card-body">
        <form class="form-inline" v-on:submit.prevent="onSubmit">
          <div class="form-group">
            <label>First name</label>
            <input
              v-model="employeeForm.employee_fname"
              type="text"
              class="form-control ml-sm-2 mr-sm-4 my-2"
              required
            />
          </div>
          <div class="form-group">
            <label>Last name</label>
            <input
              v-model="employeeForm.employee_lname"
              type="text"
              class="form-control ml-sm-2 mr-sm-4 my-2"
              required
            />
          </div>
          <div class="form-group">
            <label>Department</label>
            <input
              v-model="employeeForm.employee_dep"
              type="text"
              class="form-control ml-sm-2 mr-sm-4 my-2"
              required
            />
          </div>
          <div class="ml-auto text-right">
            <button type="submit" class="btn btn-primary my-2">Add</button>
          </div>
        </form>
      </div>
    </div>

    <div class="card mt-5">
      <div class="card-header">Employees List</div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Employee ID</th>
                <th>Employee Name</th>
                <th>Employee Department</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="employee in sortedEmployees" v-bind:key="employee.id">
                <template v-if="editId == employee.id">
                  <td>
                    <input v-model="editEmployeeData.employee_id" type="text" />
                  </td>
                  <td>
                    {{editEmployeeData.employee_name}}
                  </td>
                  <!-- <td>
                    <input v-model="editEmployeeData.employee_name" type="text" />
                  </td> -->
                  <td>
                    <input v-model="editEmployeeData.employee_dep" type="text" />
                  </td>
                  <td>
                    <span class="icon">
                      <i @click="onEditSubmit(employee.id)" class="fa fa-check"></i>
                    </span>
                    <span class="icon">
                      <i @click="onCancel" class="fa fa-ban"></i>
                    </span>
                  </td>
                </template>
                <template v-else>
                  <td>{{employee.employee_id}}</td>
                  <td>{{employee.employee_name}}</td>
                  <td>{{employee.employee_dep}}</td>
                  <td>
                    <a href="#" class="icon">
                      <i v-on:click="onDelete(employee.id)" class="fa fa-trash"></i>
                    </a>
                    <a href="#" class="icon">
                      <i v-on:click="onEdit(employee)" class="fa fa-pencil"></i>
                    </a>
                    <router-link
                      :to="{
                      name:'EmployeeDetail', 
                      params:{id: employee.id}
                    }"
                      class="icon"
                    >
                      <i class="fa fa-eye"></i>
                    </router-link>
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase";
export default {
  name: "Employees",
  data() {
    return {
      editId: "",
      employeeForm: {
        id: "",
        employee_fname: "",
        employee_lname: "",
        employee_dep: ""
      },
      editEmployeeData: {
        id: "",
        employee_id: "",
        employee_name: "",
        employee_dep: ""
      },
      employees: []
    };
  },
  created() {
    this.getEmployees();
  },
  computed: {
    sortedEmployees() {
      return this.employees.slice().sort((a, b) => {
        return a.employee_id - b.employee_id;
      });
    }
  },
  methods: {
    getEmployees() {
      db.collection("employees")
        .get()
        .then(querySnapshot => {
          const employees = [];
          // querySnapshot.forEach((doc)=>{
          //   products.push(doc.data())
          // })
          const employeesArray = [];
          let i = 0;
          querySnapshot.forEach(doc => {
            console.log(doc.data());
            let employeeName =
              doc.data().employee_fname + " " + doc.data().employee_lname;
            // employeesArray.push(doc.data());
            employeesArray.push({
              employee_id: doc.data().employee_id,
              employee_name: employeeName,
              employee_dep: doc.data().employee_dep
            });
            employeesArray[i].id = doc.id;
            employees.push(employeesArray[i]);
            i++;
          });
          // for(let key in querySnapshot.docs){
          //   employeesArray.push(querySnapshot.docs[key].data())
          //   employeesArray[key].id = querySnapshot.docs[key].id
          //   employees.push(employeesArray[key])
          // }
          console.log(employees);
          this.employees = employees;
        });
    },
    onSubmit() {
      // create id for employee
      this.employeeForm.employee_id =
        this.employeeForm.employee_lname
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/đ/g, "d")
          .replace(/Đ/g, "D")
          .trim() +
        this.employeeForm.employee_fname
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/đ/g, "d")
          .replace(/Đ/g, "D")
          .trim() +
        "." +
        this.employeeForm.employee_dep;
      db.collection("employees")
        .add(this.employeeForm)
        .then(this.getEmployees);
      this.employeeForm.employee_id = "";
      this.employeeForm.employee_fname = "";
      this.employeeForm.employee_lname = "";
      this.employeeForm.employee_dep = "";
    },
    onDelete(id) {
      db.collection("employees")
        .doc(id)
        .delete()
        .then(data => {
          console.log(data);
          this.getEmployees();
        });
    },
    onEdit(employee) {
      this.editId = employee.id;
      this.editEmployeeData.employee_id = employee.employee_id;
      this.editEmployeeData.employee_name = employee.employee_name;
      this.editEmployeeData.employee_dep = employee.employee_dep;
    },
    onCancel() {
      this.editId = "";
      this.editEmployeeData.employee_id = "";
      this.editEmployeeData.employee_name = "";
      this.editEmployeeData.employee_dep = "";
    },
    onEditSubmit(id) {
      db.collection("employees")
        .doc(id)
        .set(this.editEmployeeData)
        .then(this.getEmployees);
      this.editId = "";
      this.editEmployeeData.employee_id = "";
      this.editEmployeeData.employee_name = "";
      this.editEmployeeData.employee_dep = "";
    }
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
.icon {
  margin-right: 10px;
}
.icon i {
  cursor: pointer;
}
</style>
