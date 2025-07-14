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

const linkCache = new Cached()

const Links = () => {
    const [links, setLinks] = useState([])
    const [form, setForm] = useState({})
    const [validate, setValidate] = useState([])
    const [validateColor, setValidateColor] = useState(null)
    const [condition, setCondition] = useState(IS_CREATE)
    const [formLoading, setFormLoading] = useState(false)
    const [fetchLoading, setFetchLoading] = useState(false)
    const [lastPrefixBeforeUpdate, setLastPrefixBeforeUpdate] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const search = searchParams.get("search") || ""


    useEffect(() => {
        getLinks()
    }, []);

    const getLinks = async () => {

        if (linkCache.has()) {
            setLinks(linkCache.get());
            setFetchLoading(false);
            return;
        }

        setFetchLoading(true)
        setLinks([])
        try {
            const res = await fetchWithAuth(BASE_URL + "/api/v1/urls", {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            })
            if (!res) return

            const json = await res.json()
            setLinks(json.data)
            linkCache.set(json.data)
        } catch {
            throw new Error("Oops! Something went wrong while request to server.")
        } finally {
            setFetchLoading(false)
        }
    }

    const filteredLinks = links.filter((link) =>
        link.user.email.toLowerCase().includes(search.toLowerCase()) ||
        link.destination_url.toLowerCase().includes(search.toLowerCase()) ||
        link.prefix.toLowerCase().includes(search.toLowerCase())
    );

    const handleSearch = (e) => {
        setSearchParams({ search: e.target.value });
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    };

    const handleChangePrefix = async (e) => {
        let input = e.target.value
        handleChange(e)
        if (!input || lastPrefixBeforeUpdate === input) return setValidate([])
        const exists = await handleCheckPrefix(e, input)
        if (exists) {
            setValidateColor("text-red-500")
            setValidate({...validate, prefix: window.location.origin + "/s/" + input + " is unavailable"})
        } else {
            setValidateColor("text-green-700")
            setValidate({...validate, prefix: window.location.origin + "/s/" + input + " is available"})
        }
    }

    const handleCheckPrefix = async (e, prefix) => {
        const res = await fetchWithAuth(BASE_URL + "/api/v1/urls/exists?prefix=" + prefix, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })
        if (!res) return

        const json = await res.json()
        return json.data.exists
    }

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
            const res = await fetchWithAuth(BASE_URL + `/api/v1/urls/${id}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            })
            if (!res) return

            const json = await res.json()
            const data = json.data
            setForm({ id: data.id, prefix: data.prefix, destination_url: data.destination_url })
            setLastPrefixBeforeUpdate(data.prefix)
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
            const res = await fetchWithAuth(BASE_URL + "/api/v1/urls", {
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
            linkCache.reset()
            await getLinks()
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
            const res = await fetchWithAuth(BASE_URL + `/api/v1/urls/${id}`, {
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
            linkCache.reset()
            await getLinks()
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
            const res = await fetchWithAuth(BASE_URL + `/api/v1/urls/${id}`, {
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
            linkCache.reset()
            await getLinks()
        } catch {
            throw new Error("Oops! Something went wrong while request to server.")
        } finally {
            setFormLoading(false)
        }
    }

    return (
        <View>
            <Modal modalId="modal" modalHeader={`${condition === IS_CREATE ? "Create" : "Edit"} Link`} onHandle={(e) => condition === IS_CREATE ? handleCreate(e) : handleUpdate(e, form.id)} loading={formLoading}>
                <FlexBox properties="w-full flex-col gap-y-3">
                    <TextBox hint="e.g. yt" value={form.prefix || ""} onChange={handleChangePrefix} withLabel identifier="prefix" labelName="Prefix :" withValidation validate={validate.prefix} validateColor={validateColor}/>
                    <TextBox hint="e.g. https://youtube.com" value={form.destination_url || ""} onChange={handleChange} withLabel identifier="destination_url" labelName="Destination URL :" withValidation validate={validate.destination_url}/>
                </FlexBox>
            </Modal>
            <Modal modalId="remove-modal" isDelete modalHeader="Remove User" loading={formLoading} onHandle={(e) => handleRemove(e, form.id)} >
                <FlexBox properties="h-1" />
            </Modal>
            <BreadCrumb menu="Links"/>
            <FlexBox properties="justify-between mt-8 items-center">
                <SearchBox hint="Search links ..." onSearch={handleSearch}/>
                <StandardButton
                    properties="px-5 py-[9px] font-outfit font-normal bg-[#534FEB] rounded text-white cursor-pointer"
                    text="Create Link"
                    onClick={showCreateModal}/>
            </FlexBox>
            <Table className="mt-6">
                <Table.Head>
                    <Table.Row>
                        <Table.Heading width="10%" isFirst>
                            No
                        </Table.Heading>
                        <Table.Heading width="17%">Shorten URL</Table.Heading>
                        <Table.Heading width="17%">Destination URL</Table.Heading>
                        <Table.Heading width="17%">Visitor</Table.Heading>
                        <Table.Heading width="17%">Created By</Table.Heading>
                        <Table.Heading width="100%" isLast>Action</Table.Heading>
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    {fetchLoading ? (
                        <tr>
                            <td colSpan={6}>
                                <div className="w-full flex justify-center py-4">
                                    <div className="w-4 relative top-10 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        filteredLinks.map((link, i) => (
                            <Table.Row key={i}>
                                <Table.Cell>{i + 1}</Table.Cell>
                                <Table.Cell><a className="text-blue-500" href={window.location.origin + "/s/" + link.prefix}>{window.location.origin + "/s/" + link.prefix}</a></Table.Cell>
                                <Table.Cell><a className="text-blue-500" href={link.destination_url}>{link.destination_url}</a></Table.Cell>
                                <Table.Cell>{link.visitor}</Table.Cell>
                                <Table.Cell>{link.user.email}</Table.Cell>
                                <Table.Cell><Table.Action onUpdate={() => showUpdateModal(link.id)} onDelete={() => showRemoveModal(link.id)}></Table.Action></Table.Cell>
                            </Table.Row>
                        ))
                    )}
                </Table.Body>
            </Table>
        </View>
    )
}

export default Links;
