import BreadCrumb from "../../components/BreadCrumb";
import View from "../../components/View";
import Table from "../../components/Table";
import Badge from "../../components/Badge";
import Modal from "../../components/Modal/index.jsx";
import FlexBox from "../../components/FlexBox/index.jsx";
import SearchBox from "../../components/SearchBox/index.jsx";
import StandardButton from "../../components/StandardButton/index.jsx";
import MicroModal from 'micromodal';
import TextBox from "../../components/TextBox/index.jsx";
import {useEffect, useState} from "react";
import {BASE_URL, IS_CREATE, IS_UPDATE} from "../../constants/constant.js";
import ComboBox from "../../components/ComboBox/index.jsx";
import {useSearchParams} from "react-router-dom";
import Cached from "../../utils/Cached.js";
import {fetchWithAuth} from "../../utils/fetchWithAuth.jsx";

const userCache = new Cached()

const Users = () => {
    const [users, setUsers] = useState([])
    const [form, setForm] = useState({})
    const [validate, setValidate] = useState([])
    const [condition, setCondition] = useState(IS_CREATE)
    const [formLoading, setFormLoading] = useState(false)
    const [fetchLoading, setFetchLoading] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const search = searchParams.get("search") || ""


    useEffect(() => {
        getUsers()
    }, []);

    const getUsers = async () => {

        if (userCache.has()) {
            setUsers(userCache.get());
            setFetchLoading(false);
            return;
        }

        setFetchLoading(true)
        setUsers([])
        try {
            const res = await fetchWithAuth(BASE_URL + "/api/v1/users", {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            })
            if (!res) return

            const json = await res.json()
            setUsers(json.data)
            userCache.set(json.data)
        } catch {
            throw new Error("Oops! Something went wrong while request to server.")
        } finally {
            setFetchLoading(false)
        }
    }

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    const handleSearch = (e) => {
        setSearchParams({ search: e.target.value });
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    };

    const showCreateModal = () => {
        setCondition(IS_CREATE)
        setForm({})
        setValidate([])
        MicroModal.show("modal", {disableScroll: true, disableFocus: true})
    }

    const showUpdateModal = async (id) => {
        setCondition(IS_UPDATE)
        setForm({})
        setValidate([])
        try {
            const res = await fetchWithAuth(BASE_URL + `/api/v1/users/${id}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            })
            if (!res) return

            const json = await res.json()
            const data = json.data
            setForm({ id: data.id, name: data.name, email: data.email, password: "", role_id: data.role.id })
        } catch {
            throw new Error("Oops! Something went wrong while request to server.")
        } finally {
            MicroModal.show("modal", {disableScroll: true, disableFocus: true})
        }
    }

    const showRemoveModal = (id) => {
        setForm({})
        setForm({id: id})
        MicroModal.show("remove-modal")
    }

    const CloseModal = () => {
        MicroModal.close("modal");
        MicroModal.close("remove-modal");
    };

    const handleCreate = async (e) => {
        e.preventDefault()
        setFormLoading(true)
        try {
            const res = await fetchWithAuth(BASE_URL + "/api/v1/users", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            if (!res) return

            if (res.status === 422) {
                const err = await res.json()
                setValidate(err.data)
                return
            } else if (!res.ok) {
                throw new Error("Unexpected error.")
            }
            CloseModal()
            userCache.reset()
            await getUsers()
        } catch {
            throw new Error("Oops! Something went wrong while request to server.")
        } finally {
            setFormLoading(false)
        }
    }

    const handleUpdate = async (e, id) => {
        e.preventDefault()
        setFormLoading(true)
        try {
            const res = await fetchWithAuth(BASE_URL + `/api/v1/users/${id}`, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            if (!res) return

            if (res.status === 422) {
                const err = await res.json()
                setValidate(err.data)
                return
            } else if (!res.ok) {
                throw new Error("Unexpected error.")
            }
            CloseModal()
            userCache.reset()
            await getUsers()
        } catch {
            throw new Error("Oops! Something went wrong while request to server.")
        } finally {
            setFormLoading(false)
        }
    }

    const handleRemove = async (e, id) => {
        e.preventDefault()
        setFormLoading(true)
        try {
            const res = await fetchWithAuth(BASE_URL + `/api/v1/users/${id}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
            if (!res) return

            if (!res.ok) {
                throw new Error("Unexpected error.")
            }
            CloseModal()
            userCache.reset()
            await getUsers()
        } catch {
            throw new Error("Oops! Something went wrong while request to server.")
        } finally {
            setFormLoading(false)
        }
    }

    return (
        <View>
            <Modal modalId="modal" modalHeader={`${condition === IS_CREATE ? "Create" : "Edit"} User`} onHandle={(e) => condition === IS_CREATE ? handleCreate(e) : handleUpdate(e, form.id)} loading={formLoading}>
                <FlexBox properties="w-full flex-col gap-y-3">
                    <TextBox hint="e.g. John Smith" value={form.name || ""} onChange={handleChange} withLabel identifier="name" labelName="Name :" withValidation validate={validate.name}/>
                    <TextBox hint="example@mail.com" value={form.email || ""} onChange={handleChange} withLabel identifier="email" labelName="Email :" withValidation validate={validate.email}/>
                    <TextBox hint="Enter your password" value={form.password || ""} onChange={handleChange} type="password" withLabel identifier="password"
                             labelName="Password :" withValidation validate={validate.password}/>
                    <ComboBox identifier="role_id" labelName="Role :" onChange={handleChange} withLabel withValidation validate={validate.role_id} value={form.role_id || ""}>
                        <ComboBox.Option value="" hint="Select role" asPlaceholder/>
                        <ComboBox.Option value="1" hint="Administrator"/>
                        <ComboBox.Option value="2" hint="User"/>
                    </ComboBox>
                </FlexBox>
            </Modal>
            <Modal modalId="remove-modal" isDelete modalHeader="Remove User" loading={formLoading} onHandle={(e) => handleRemove(e, form.id)} >
                <FlexBox properties="h-1" />
            </Modal>
            <BreadCrumb menu="Users"/>
            <FlexBox properties="justify-between mt-8 items-center">
                <SearchBox hint="Search users ..." onSearch={handleSearch}/>
                <StandardButton
                    properties="px-5 py-[9px] font-outfit font-normal bg-[#534FEB] rounded text-white cursor-pointer"
                    text="Create User"
                    onClick={showCreateModal}/>
            </FlexBox>
            <Table className="mt-6">
                <Table.Head>
                    <Table.Row>
                        <Table.Heading width="10%" isFirst>
                            No
                        </Table.Heading>
                        <Table.Heading width="23%">Name</Table.Heading>
                        <Table.Heading width="23%">Email</Table.Heading>
                        <Table.Heading width="23%">Role</Table.Heading>
                        <Table.Heading width="100%" isLast>Action</Table.Heading>
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    {fetchLoading ? (
                        <tr>
                            <td colSpan={5}>
                                <div className="w-full flex justify-center py-4">
                                    <div className="w-4 relative top-10 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        filteredUsers.map((user, i) => (
                            <Table.Row key={i}>
                                <Table.Cell>{i + 1}</Table.Cell>
                                <Table.Cell>{user.name}</Table.Cell>
                                <Table.Cell>{user.email}</Table.Cell>
                                <Table.Cell>{user.role.role === "admin" ? <Badge isAdmin/> : <Badge/>}</Table.Cell>
                                <Table.Cell><Table.Action onUpdate={() => showUpdateModal(user.id)} onDelete={() => showRemoveModal(user.id)}></Table.Action></Table.Cell>
                            </Table.Row>
                        ))
                    )}
                </Table.Body>
            </Table>
        </View>
    )
}

export default Users;
