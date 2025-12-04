import { useState } from 'react'
import { useTutorProfile } from '@/hooks/useTutorProfile'
import { updateTutorSubjects } from '@/api/tutorApi'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/HeaderDetail'
import InternalFooter from '@/components/InternalFooter'
import { Button } from '@/components/ui/button'
import { Edit2, Save, X, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

const TutorProfile = () => {
    const queryClient = useQueryClient()
    const { data: profile, isLoading } = useTutorProfile()

    const [isEditingSubjects, setIsEditingSubjects] = useState(false)
    const [subjects, setSubjects] = useState<string[]>([])
    const [newSubject, setNewSubject] = useState('')

    const updateSubjectsMutation = useMutation({
        mutationFn: updateTutorSubjects,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tutorProfile'] })
            setIsEditingSubjects(false)
            toast.success('Teaching subjects updated successfully!')
        },
        onError: () => {
            toast.error('Failed to update teaching subjects')
        }
    })

    const handleEditSubjects = () => {
        setSubjects(profile?.teachingSubjects || [])
        setIsEditingSubjects(true)
    }

    const handleCancelEdit = () => {
        setIsEditingSubjects(false)
        setNewSubject('')
    }

    const handleSaveSubjects = () => {
        updateSubjectsMutation.mutate(subjects)
    }

    const handleAddSubject = () => {
        if (newSubject.trim() && !subjects.includes(newSubject.trim())) {
            setSubjects([...subjects, newSubject.trim()])
            setNewSubject('')
        }
    }

    const handleRemoveSubject = (subject: string) => {
        setSubjects(subjects.filter((s) => s !== subject))
    }

    if (isLoading) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <div className='text-gray-500'>Loading profile...</div>
            </div>
        )
    }

    if (!profile) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <div className='text-gray-600'>Profile not found</div>
            </div>
        )
    }

    return (
        <div className='min-h-screen flex flex-col bg-gray-50'>
            <Header />
            <div className='flex flex-1'>
                <Sidebar />

                <main className='flex-1 ml-0 xl:ml-[282px] mt-[64px] p-8'>
                    <div className='max-w-4xl mx-auto'>
                        {/* Header Section */}
                        <div className='bg-white rounded-xl shadow-sm p-8 mb-6'>
                            <div className='flex items-start gap-8'>
                                {/* Avatar */}
                                <div className='flex-shrink-0'>
                                    <img
                                        src={profile.avatar || 'https://i.pravatar.cc/200?img=1'}
                                        alt={profile.fullName}
                                        className='w-32 h-32 rounded-full object-cover border-4 border-gray-100'
                                    />
                                </div>

                                {/* Basic Info */}
                                <div className='flex-1'>
                                    <h1 className='text-3xl font-bold text-gray-800 mb-2'>{profile.fullName}</h1>
                                    <div className='flex items-center gap-2 mb-4'>
                                        <span className='px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium'>
                                            Tutor
                                        </span>
                                        <span className='flex items-center gap-1 text-yellow-500'>
                                            <svg className='w-5 h-5 fill-current' viewBox='0 0 20 20'>
                                                <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
                                            </svg>
                                            <span className='text-gray-700 font-semibold'>{profile.rating.toFixed(1)}</span>
                                        </span>
                                    </div>
                                    <p className='text-gray-600 mb-4'>{profile.bio}</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className='bg-white rounded-xl shadow-sm p-6 mb-6'>
                            <h2 className='text-xl font-semibold text-gray-800 mb-4'>Contact Information</h2>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div>
                                    <label className='text-sm font-medium text-gray-500'>Email</label>
                                    <p className='text-gray-800'>{profile.email}</p>
                                </div>
                                <div>
                                    <label className='text-sm font-medium text-gray-500'>Phone</label>
                                    <p className='text-gray-800'>{profile.phone}</p>
                                </div>
                                <div>
                                    <label className='text-sm font-medium text-gray-500'>Address</label>
                                    <p className='text-gray-800'>{profile.address}</p>
                                </div>
                                <div>
                                    <label className='text-sm font-medium text-gray-500'>Date of Birth</label>
                                    <p className='text-gray-800'>{new Date(profile.dateOfBirth).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <label className='text-sm font-medium text-gray-500'>Gender</label>
                                    <p className='text-gray-800'>{profile.sex}</p>
                                </div>
                            </div>
                        </div>

                        {/* Teaching Subjects */}
                        <div className='bg-white rounded-xl shadow-sm p-6'>
                            <div className='flex items-center justify-between mb-4'>
                                <h2 className='text-xl font-semibold text-gray-800'>Teaching Subjects</h2>
                                {!isEditingSubjects ? (
                                    <Button
                                        onClick={handleEditSubjects}
                                        variant='outline'
                                        size='sm'
                                        className='flex items-center gap-2'
                                    >
                                        <Edit2 className='w-4 h-4' />
                                        Edit
                                    </Button>
                                ) : (
                                    <div className='flex gap-2'>
                                        <Button
                                            onClick={handleSaveSubjects}
                                            size='sm'
                                            className='flex items-center gap-2'
                                            disabled={updateSubjectsMutation.isPending}
                                        >
                                            <Save className='w-4 h-4' />
                                            {updateSubjectsMutation.isPending ? 'Saving...' : 'Save'}
                                        </Button>
                                        <Button
                                            onClick={handleCancelEdit}
                                            variant='outline'
                                            size='sm'
                                            className='flex items-center gap-2'
                                        >
                                            <X className='w-4 h-4' />
                                            Cancel
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {!isEditingSubjects ? (
                                <div className='flex flex-wrap gap-2'>
                                    {profile.teachingSubjects.map((subject, index) => (
                                        <span
                                            key={index}
                                            className='px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium'
                                        >
                                            {subject}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <div>
                                    {/* Add new subject */}
                                    <div className='flex gap-2 mb-4'>
                                        <input
                                            type='text'
                                            value={newSubject}
                                            onChange={(e) => setNewSubject(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleAddSubject()}
                                            placeholder='Add new subject...'
                                            className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        />
                                        <Button onClick={handleAddSubject} size='sm' className='flex items-center gap-2'>
                                            <Plus className='w-4 h-4' />
                                            Add
                                        </Button>
                                    </div>

                                    {/* Subject list */}
                                    <div className='flex flex-wrap gap-2'>
                                        {subjects.map((subject, index) => (
                                            <div
                                                key={index}
                                                className='flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium'
                                            >
                                                <span>{subject}</span>
                                                <button
                                                    onClick={() => handleRemoveSubject(subject)}
                                                    className='hover:bg-blue-200 rounded-full p-1 transition-colors'
                                                >
                                                    <Trash2 className='w-3 h-3' />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>

            <InternalFooter />
        </div>
    )
}

export default TutorProfile
