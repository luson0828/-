<<<<<<< HEAD
<template>
    <div>
        <div class="card">
            <el-card>
            <el-input style="width: 240px;" v-model="data.name" placeholder="请输入名称查询" prefix-icon="Search" />    
            <el-button  @click="load" type="primary" style="margin-left: 5px;">查 询</el-button> 
            <el-button @click="reset" type="warning" style="margin-left: 5px;">重 置</el-button>
            </el-card>
        </div>

        <div class="card">
            <el-card>
                <el-button type="primary" style="margin-left: 5px;" @click="handleAdd">新 增</el-button>
                <el-button type="warning" style="margin-left: 10px;" @click="delBatch">批量删除</el-button>
                <el-upload
                        style="display: inline-block; margin: 0 5px;"
                        action="http://localhost:8080/employee/import"
                        :show-file-list="false"
                        :on-success="importSuccess"
                    >
                    <el-button type="success" style="margin-left: 5px;">导 入</el-button>
                </el-upload>
                
                <el-button @click="exportData" type="info" style="margin-left: 5px;">导 出</el-button>
            </el-card>
        </div>

        <div class="card">
            <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="username" label="账号"/>
            <el-table-column label="头像">
                <template #default="scope">
                    <img v-if="scope.row.avatar" :src="scope.row.avatar" style="width: 40px; height: 40px; border-radius: 50%;">
                </template>
            </el-table-column>    
            <el-table-column prop="name" label="名称"/>
            <el-table-column prop="sex" label="姓别"/>
            <el-table-column prop="no" label="工号" />
            <el-table-column prop="age" label="年龄" />
            <el-table-column prop="description" label="个人介绍" show-overflow-tooltip/>
            <el-table-column prop="departmentName" label="部门" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button @click="handleUpdate(scope.row)" type="primary" :icon="Edit" circle></el-button>
                    <el-button @click="del(scope.row.id)" type="danger"  :icon="Delete" circle></el-button>
                </template>
            </el-table-column>
            </el-table>
        </div>

        <div class="card">
            <el-pagination
            @size-change="load"
            @current-change="load"
            v-model:current-page="data.pageNum"
            v-model:page-size="data.pageSize"
            :page-sizes="[5, 10, 15, 20,]"
            :size="size"
            :background="background"
            layout="total, sizes, prev, pager, next, jumper"
            :total="data.total"
            />
        </div>

        <div>
            <el-dialog v-model="data.formVisible" title="员工信息" width="500" destroy-on-close>
                <el-form ref="formRef" :rules="data.rules" :model="data.form" label-width="80px" style="padding-right: 40px; padding-top: 20px;">

                    <el-form-item label="账号" prop="username">
                        <el-input v-model="data.form.username" autocomplete="off" placeholder="请输入账号" />
                    </el-form-item>

                    <el-form-item label="头像">
                        <el-upload
                            :action="uploadUrl"
                            list-type="picture"
                            :on-success="handleAvatarSuccess"
                        >
                        <el-button type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="名称" prop="name">
                        <el-input v-model="data.form.name" autocomplete="off" placeholder="请输入名称" />
                    </el-form-item>

                    <el-form-item label="性别">
                        <el-radio-group v-model="data.form.sex">
                            <el-radio label="男" value="男">男</el-radio>
                            <el-radio label="女" value="女">女</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="工号" prop = "no">
                        <el-input v-model="data.form.no" autocomplete="off" placeholder="请输入工号" />
                    </el-form-item>

                    <el-form-item label="年龄">
                        <el-input-number style="width: 180px" :min="18" :max="35" v-model="data.form.age" autocomplete="off" placeholder="请输入年龄" />
                    </el-form-item>

                    <el-form-item label="部门">
                        <el-select v-model="data.form.departmentId" placeholder="请选择部门" style="width: 100%">
                            <el-option
                                v-for="item in data.departments"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                                />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="个人介绍">
                        <el-input :row="4" type="textarea" v-model="data.form.description" autocomplete="off" placeholder="请输入个人介绍" />
                    </el-form-item>

                </el-form>
                
                <template #footer>
                <div class="dialog-footer">
                    <el-button @click="data.formVisible = false">取 消</el-button>
                    <el-button type="primary" @click="save">保 存</el-button>
                </div>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<script setup>
import {
  Check,
  Delete,
  Edit,
  Message,
  Star,
  Search,
} from '@element-plus/icons-vue'
import { reactive, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import request from '@/utils/request.js'
import "./../../main.js";
import { ElMessage, ElMessageBox } from 'element-plus';

const route = useRoute()

const data = reactive({   
    tableData: [],
    name: null,
    pageNum: 1,
    pageSize: 10,
    total: 0,
    formVisible: false,
    form: {},
    ids: {},
    departments: [],
    rules: {
        username: [
            { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
        ],
        no: [
            { required: true, message: '请输入工号', trigger: 'blur' },
        ],

    }
})

const uploadUrl = ref('http://localhost:8080/files/upload')

const importSuccess = () => {
    ElMessage.success('批量导入数据成功')
    load()
}

const exportData = () => {
    //导出数据是通过流的形式下载excel，打开流的链接，浏览器会自动下载文件
    window.open('http://localhost:8080/employee/export')
}

const handleAvatarSuccess = (res) => {
    data.form.avatar = res.data
}

const formRef = ref(null) //ref() 函数会返回一个包含 value 属性的对象，我们可以通过 formRef.value 来访问表单实例

const load = () => {
    request.get('/employee/selectPage', {
        params: {
            pageNum: data.pageNum,
            pageSize: data.pageSize,
            name: data.name,
        }
    }).then(res => {
        data.tableData = res.data.list
        data.total = res.data.total
    })
}

const loadDepartments = () => {
    request.get('/department/selectAll').then(res => {
        data.departments = res.data
    })
}
load()

const reset = () => {
    data.name = null
    load()
}

const handleAdd = () => {
    data.formVisible = true;
    data.form = {}
    loadDepartments()
}

const save = () =>{
    formRef.value.validate((valid) => { // 调用表单实例的 validate 方法进行表单验证
        if (valid) {
            data.form.id ? update() : add()
        }
    })

}

const handleUpdate = (row) => {
    data.form = JSON.parse(JSON.stringify(row)) //深拷贝，取消后不会修改原对象
    data.formVisible = true
    loadDepartments()
}

const add = () => {
        request.post('/employee/add' , data.form).then(res => {
        if(res.code === '200') {
            data.formVisible = false
            ElMessage.success('新增操作成功啦')
            load()
        }else{
            ElMessage.error(res.msg)
        }
    })
}

const update = () => {
        request.put('/employee/update' , data.form).then(res => {
        if(res.code === '200') {
            data.formVisible = false
            ElMessage.success('更新操作成功啦')
            load()
        }else{
            ElMessage.error(res.msg)
        }
    })
}

const del = (id) => {
    ElMessageBox.confirm('删除后无法恢复，确认删除吗？','确认删除', {type:'warning'}).then(() => {
          request.delete('/employee/deleteById/' + id).then(res => {
        if(res.code === '200') {
            ElMessage.success('删除操作成功啦')
            load()
        }else{
            ElMessage.error(res.msg)
        }
    })  
    }).catch(() => {
        // 用户点击了取消按钮，可添加提示信息
        ElMessage.info('已取消删除操作')
    })

}

const handleSelectionChange = (rows) => {
    data.ids = rows.map(row => row.id)
}

const delBatch = () => {
    if(data.ids.length === 0) {
        ElMessage.warning('请选择数据')
        return //终止下面函数的执行
    }
    ElMessageBox.confirm('删除后无法恢复，确认删除吗？','确认删除', {type:'warning'}).then(() => {
        request.delete('/employee/deleteBatch', {data: data.ids}).then(res => {
            if(res.code === '200') {
                ElMessage.success('删除操作成功啦')
                load()
        }else{
            ElMessage.error(res.msg)
        }
    })  
    }).catch(() => {
        // 用户点击了取消按钮，可添加提示信息
        ElMessage.info('已取消删除操作')
    })
}



onMounted(() => {
  // 检测URL参数，如果action=add则自动打开新增对话框
  if (route.query.action === 'add') {
    handleAdd()
  }
})

</script>

<style scoped>



=======
<template>
    <div>
        <div class="card">
            <el-card>
            <el-input style="width: 240px;" v-model="data.name" placeholder="请输入名称查询" prefix-icon="Search" />    
            <el-button  @click="load" type="primary" style="margin-left: 5px;">查 询</el-button> 
            <el-button @click="reset" type="warning" style="margin-left: 5px;">重 置</el-button>
            </el-card>
        </div>

        <div class="card">
            <el-card>
                <el-button type="primary" style="margin-left: 5px;" @click="handleAdd">新 增</el-button>
                <el-button type="warning" style="margin-left: 10px;" @click="delBatch">批量删除</el-button>
                <el-upload
                        style="display: inline-block; margin: 0 5px;"
                        action="http://localhost:8080/employee/import"
                        :show-file-list="false"
                        :on-success="importSuccess"
                    >
                    <el-button type="success" style="margin-left: 5px;">导 入</el-button>
                </el-upload>
                
                <el-button @click="exportData" type="info" style="margin-left: 5px;">导 出</el-button>
            </el-card>
        </div>

        <div class="card">
            <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="username" label="账号"/>
            <el-table-column label="头像">
                <template #default="scope">
                    <img v-if="scope.row.avatar" :src="scope.row.avatar" style="width: 40px; height: 40px; border-radius: 50%;">
                </template>
            </el-table-column>    
            <el-table-column prop="name" label="名称"/>
            <el-table-column prop="sex" label="姓别"/>
            <el-table-column prop="no" label="工号" />
            <el-table-column prop="age" label="年龄" />
            <el-table-column prop="description" label="个人介绍" show-overflow-tooltip/>
            <el-table-column prop="departmentName" label="部门" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button @click="handleUpdate(scope.row)" type="primary" :icon="Edit" circle></el-button>
                    <el-button @click="del(scope.row.id)" type="danger"  :icon="Delete" circle></el-button>
                </template>
            </el-table-column>
            </el-table>
        </div>

        <div class="card">
            <el-pagination
            @size-change="load"
            @current-change="load"
            v-model:current-page="data.pageNum"
            v-model:page-size="data.pageSize"
            :page-sizes="[5, 10, 15, 20,]"
            :size="size"
            :background="background"
            layout="total, sizes, prev, pager, next, jumper"
            :total="data.total"
            />
        </div>

        <div>
            <el-dialog v-model="data.formVisible" title="员工信息" width="500" destroy-on-close>
                <el-form ref="formRef" :rules="data.rules" :model="data.form" label-width="80px" style="padding-right: 40px; padding-top: 20px;">

                    <el-form-item label="账号" prop="username">
                        <el-input v-model="data.form.username" autocomplete="off" placeholder="请输入账号" />
                    </el-form-item>

                    <el-form-item label="头像">
                        <el-upload
                            :action="uploadUrl"
                            list-type="picture"
                            :on-success="handleAvatarSuccess"
                        >
                        <el-button type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="名称" prop="name">
                        <el-input v-model="data.form.name" autocomplete="off" placeholder="请输入名称" />
                    </el-form-item>

                    <el-form-item label="性别">
                        <el-radio-group v-model="data.form.sex">
                            <el-radio label="男" value="男">男</el-radio>
                            <el-radio label="女" value="女">女</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="工号" prop = "no">
                        <el-input v-model="data.form.no" autocomplete="off" placeholder="请输入工号" />
                    </el-form-item>

                    <el-form-item label="年龄">
                        <el-input-number style="width: 180px" :min="18" :max="35" v-model="data.form.age" autocomplete="off" placeholder="请输入年龄" />
                    </el-form-item>

                    <el-form-item label="部门">
                        <el-select v-model="data.form.departmentId" placeholder="请选择部门" style="width: 100%">
                            <el-option
                                v-for="item in data.departments"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                                />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="个人介绍">
                        <el-input :row="4" type="textarea" v-model="data.form.description" autocomplete="off" placeholder="请输入个人介绍" />
                    </el-form-item>

                </el-form>
                
                <template #footer>
                <div class="dialog-footer">
                    <el-button @click="data.formVisible = false">取 消</el-button>
                    <el-button type="primary" @click="save">保 存</el-button>
                </div>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<script setup>
import {
  Check,
  Delete,
  Edit,
  Message,
  Star,
  Search,
} from '@element-plus/icons-vue'
import { reactive, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import request from '@/utils/request.js'
import "./../../main.js";
import { ElMessage, ElMessageBox } from 'element-plus';

const route = useRoute()

const data = reactive({   
    tableData: [],
    name: null,
    pageNum: 1,
    pageSize: 10,
    total: 0,
    formVisible: false,
    form: {},
    ids: {},
    departments: [],
    rules: {
        username: [
            { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
        ],
        no: [
            { required: true, message: '请输入工号', trigger: 'blur' },
        ],

    }
})

const uploadUrl = ref('http://localhost:8080/files/upload')

const importSuccess = () => {
    ElMessage.success('批量导入数据成功')
    load()
}

const exportData = () => {
    //导出数据是通过流的形式下载excel，打开流的链接，浏览器会自动下载文件
    window.open('http://localhost:8080/employee/export')
}

const handleAvatarSuccess = (res) => {
    data.form.avatar = res.data
}

const formRef = ref(null) //ref() 函数会返回一个包含 value 属性的对象，我们可以通过 formRef.value 来访问表单实例

const load = () => {
    request.get('/employee/selectPage', {
        params: {
            pageNum: data.pageNum,
            pageSize: data.pageSize,
            name: data.name,
        }
    }).then(res => {
        data.tableData = res.data.list
        data.total = res.data.total
    })
}

const loadDepartments = () => {
    request.get('/department/selectAll').then(res => {
        data.departments = res.data
    })
}
load()

const reset = () => {
    data.name = null
    load()
}

const handleAdd = () => {
    data.formVisible = true;
    data.form = {}
    loadDepartments()
}

const save = () =>{
    formRef.value.validate((valid) => { // 调用表单实例的 validate 方法进行表单验证
        if (valid) {
            data.form.id ? update() : add()
        }
    })

}

const handleUpdate = (row) => {
    data.form = JSON.parse(JSON.stringify(row)) //深拷贝，取消后不会修改原对象
    data.formVisible = true
    loadDepartments()
}

const add = () => {
        request.post('/employee/add' , data.form).then(res => {
        if(res.code === '200') {
            data.formVisible = false
            ElMessage.success('新增操作成功啦')
            load()
        }else{
            ElMessage.error(res.msg)
        }
    })
}

const update = () => {
        request.put('/employee/update' , data.form).then(res => {
        if(res.code === '200') {
            data.formVisible = false
            ElMessage.success('更新操作成功啦')
            load()
        }else{
            ElMessage.error(res.msg)
        }
    })
}

const del = (id) => {
    ElMessageBox.confirm('删除后无法恢复，确认删除吗？','确认删除', {type:'warning'}).then(() => {
          request.delete('/employee/deleteById/' + id).then(res => {
        if(res.code === '200') {
            ElMessage.success('删除操作成功啦')
            load()
        }else{
            ElMessage.error(res.msg)
        }
    })  
    }).catch(() => {
        // 用户点击了取消按钮，可添加提示信息
        ElMessage.info('已取消删除操作')
    })

}

const handleSelectionChange = (rows) => {
    data.ids = rows.map(row => row.id)
}

const delBatch = () => {
    if(data.ids.length === 0) {
        ElMessage.warning('请选择数据')
        return //终止下面函数的执行
    }
    ElMessageBox.confirm('删除后无法恢复，确认删除吗？','确认删除', {type:'warning'}).then(() => {
        request.delete('/employee/deleteBatch', {data: data.ids}).then(res => {
            if(res.code === '200') {
                ElMessage.success('删除操作成功啦')
                load()
        }else{
            ElMessage.error(res.msg)
        }
    })  
    }).catch(() => {
        // 用户点击了取消按钮，可添加提示信息
        ElMessage.info('已取消删除操作')
    })
}



onMounted(() => {
  // 检测URL参数，如果action=add则自动打开新增对话框
  if (route.query.action === 'add') {
    handleAdd()
  }
})

</script>

<style scoped>



>>>>>>> c0a64c83aee6dd6363c32cb780aae9bc3415dcce
</style>