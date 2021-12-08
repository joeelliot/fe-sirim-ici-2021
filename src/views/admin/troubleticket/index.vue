<template>
  <div style="margin-left: 20px; margin-right: 20px; margin-bottom: 20px;">
    <div>
      <h1>Trouble Ticket</h1>
      <div style="display: flex; flex-direction: row; width: 100%; justify-content: flex-start; align-items: center;">
        <el-button type="primary">Add Trouble Ticket</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'users',
  data() {
    return {
        siriusUsers: [],
        installerUsers: [],
        retailerUsers: [],
        locations: [],
        users: [],
        filteredUsers: [],
        mode: 'create',
        currId: '',
        currUser: {},
        currUser2: {
            type: '',
            serialNumber: '',
            activationCode: '',
            locationId: '',
            userId: '',
            installerId: '',
            retailerId: ''
        },
        fulfillmentCreate: false,
        fulfillmentDelete: false,
        logView: false,
        btnloading: false,
        total: 0,
        page: 1,
        limit: 15
    }
  }
}
</script>