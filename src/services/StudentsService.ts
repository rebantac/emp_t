import NetworkUtils from "@/utils/NetworkUtils";

export default new class StudentsService {
  async getStudents() {
    const form = {
      endpoint: 'students',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }

    const result = await NetworkUtils.execute(form);
    return result;
  }

  async deleteStudent(id: number) {
    const form = {
      endpoint: `students/${id}`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    }

    const result = await NetworkUtils.execute(form);
    return result;
  }

  async addStudent(record: any) {
    const form = { 
      endpoint: 'students', 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json', }, 
      body: JSON.stringify(record) 
    }

    const result = await NetworkUtils.execute(form);
    return result;
  }

  async editStudent(record: any) {
    const form = { 
      endpoint: 'students', 
      method: 'PATCH', 
      headers: { 'Content-Type': 'application/json', }, 
      body: JSON.stringify(record) 
    }

    const result = await NetworkUtils.execute(form);
    return result;
  }

  async predictRate(record: any) {
    const form = { 
      endpoint: 'predict_suicide_rate', 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json', }, 
      body: JSON.stringify(record) 
    }

    const url = "http://localhost:5000";

    const result = await NetworkUtils.execute(form, url);
    return result;
  }

  async addSuicideRate(record: any) {
    const form = { 
      endpoint: 'students', 
      method: 'PUT', 
      headers: { 'Content-Type': 'application/json', }, 
      body: JSON.stringify(record) 
    }

    const result = await NetworkUtils.execute(form);
    return result;
  }
}