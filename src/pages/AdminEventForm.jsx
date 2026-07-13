import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  createEvent,
  fetchEventById,
  generateFlyer,
  selectFlyer,
  updateEvent,
} from '../api/events';
import { uploadMedia } from '../api/media';
import { useAuth } from '../auth/AuthProvider';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import { EVENT_FLYER_ASPECT_RATIO } from '../constants/eventMedia';

const INITIAL_STATE = {
  title: '',
  description: '',
  location: '',
  startDate: '',
  registrationLink: '',
  coverImageUrl: '',
  gallery: [],
  flyerUrl: '',
  flyerOptions: [],
};

export default function AdminEventForm() {
  const { eventId } = useParams();
  const isEditing = Boolean(eventId);
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formState, setFormState] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [flyerLoading, setFlyerLoading] = useState(false);

  const section = new URLSearchParams(location.search).get('section') === 'archived'
    ? 'archived'
    : 'current';
  const dashboardPath = `/admin/events?section=${section}`;

  useEffect(() => {
    let isMounted = true;

    async function loadEvent() {
      if (!isEditing) return;
      setLoading(true);
      setError(null);
      try {
        const event = await fetchEventById(eventId, token);
        if (isMounted) {
          setFormState({
            ...INITIAL_STATE,
            ...event,
            gallery: event?.gallery || [],
          });
        }
      } catch (err) {
        if (isMounted) setError(err?.message || 'Unable to load event');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadEvent();
    return () => {
      isMounted = false;
    };
  }, [isEditing, eventId, token]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = {
        title: formState.title,
        description: formState.description,
        location: formState.location,
        startDate: formState.startDate,
        registrationLink: formState.registrationLink,
        coverImageUrl: formState.coverImageUrl,
        gallery: formState.gallery,
        flyerUrl: formState.flyerUrl,
      };

      if (isEditing) {
        await updateEvent(eventId, payload, token);
      } else {
        const created = await createEvent(payload, token);
        const createdId = created?._id || created?.id;
        if (createdId) {
          navigate(`/admin/events/${createdId}/edit?section=${section}`, { replace: true });
          return;
        }
      }

      navigate(dashboardPath);
    } catch (err) {
      setError(err?.message || 'Unable to save event');
    } finally {
      setSaving(false);
    }
  };

  const uploadCover = async (file) => {
    setUploading(true);
    setError(null);
    try {
      const url = await uploadMedia({ file, folder: 'events/cover' }, token);
      setFormState((prev) => ({ ...prev, coverImageUrl: url }));
    } catch (err) {
      setError(err?.message || 'Cover upload failed');
    } finally {
      setUploading(false);
    }
  };

  const uploadGallery = async (files) => {
    if (!files.length) return;
    setUploading(true);
    setError(null);
    try {
      const urls = [];
      for (const file of files) {
        const url = await uploadMedia({ file, folder: 'events/gallery' }, token);
        urls.push(url);
      }
      setFormState((prev) => ({
        ...prev,
        gallery: [...prev.gallery, ...urls],
      }));
    } catch (err) {
      setError(err?.message || 'Gallery upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleGenerateFlyer = async () => {
    if (!isEditing) return;
    setFlyerLoading(true);
    setError(null);
    try {
      const result = await generateFlyer(eventId, token);
      setFormState((prev) => ({
        ...prev,
        flyerOptions: result?.options || [],
      }));
    } catch (err) {
      setError(err?.message || 'Unable to generate flyers');
    } finally {
      setFlyerLoading(false);
    }
  };

  const handleSelectFlyer = async (selectedUrl) => {
    if (!isEditing) return;
    setFlyerLoading(true);
    setError(null);
    try {
      await selectFlyer(eventId, selectedUrl, token);
      setFormState((prev) => ({
        ...prev,
        flyerUrl: selectedUrl,
        flyerOptions: prev.flyerOptions || [],
      }));
    } catch (err) {
      setError(err?.message || 'Unable to save flyer selection');
    } finally {
      setFlyerLoading(false);
    }
  };

  const galleryItems = useMemo(() => formState.gallery || [], [formState.gallery]);

  if (loading) {
    return <LoadingState message="Loading event..." />;
  }

  return (
    <section className="bg-lasa-50 py-10">
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-lasa-600">
              {isEditing ? 'Edit Event' : 'Create Event'}
            </h1>
            <p className="mt-1 text-sm text-lasa-500">
              Manage event details, images, and flyers.
            </p>
          </div>
          <Link
            to={dashboardPath}
            className="rounded-xl border border-lasa-200 bg-white px-4 py-2 text-sm font-semibold text-lasa-600 hover:bg-lasa-100"
          >
            Back to Dashboard
          </Link>
        </div>

        {error && (
          <div className="mt-6">
            <ErrorState message={error} />
          </div>
        )}

        <form onSubmit={handleSave} className="mt-8 space-y-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-6 rounded-2xl border border-lasa-200 bg-white p-6 shadow-sm">
              <Field label="Title" required>
                <input
                  type="text"
                  name="title"
                  value={formState.title}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-xl border border-lasa-200 px-4 py-3 text-sm text-lasa-600 focus:border-lasa-500 focus:outline-none focus:ring-2 focus:ring-lasa-200"
                />
              </Field>

              <Field label="Location">
                <input
                  type="text"
                  name="location"
                  value={formState.location}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-lasa-200 px-4 py-3 text-sm text-lasa-600 focus:border-lasa-500 focus:outline-none focus:ring-2 focus:ring-lasa-200"
                />
              </Field>

              <Field label="Start Date" required>
                <input
                  type="date"
                  name="startDate"
                  value={formState.startDate ? formState.startDate.slice(0, 10) : ''}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-xl border border-lasa-200 px-4 py-3 text-sm text-lasa-600 focus:border-lasa-500 focus:outline-none focus:ring-2 focus:ring-lasa-200"
                />
              </Field>

              <Field label="Description">
                <textarea
                  name="description"
                  value={formState.description}
                  onChange={handleChange}
                  rows={5}
                  className="mt-2 w-full rounded-xl border border-lasa-200 px-4 py-3 text-sm text-lasa-600 focus:border-lasa-500 focus:outline-none focus:ring-2 focus:ring-lasa-200"
                />
              </Field>

              <Field label="Event Registration Link">
                <input
                  type="url"
                  name="registrationLink"
                  value={formState.registrationLink || ''}
                  onChange={handleChange}
                  placeholder="https://example.com/register"
                  className="mt-2 w-full rounded-xl border border-lasa-200 px-4 py-3 text-sm text-lasa-600 focus:border-lasa-500 focus:outline-none focus:ring-2 focus:ring-lasa-200"
                />
              </Field>
            </div>

            <div className="space-y-6 rounded-2xl border border-lasa-200 bg-white p-6 shadow-sm">
              <Field label="Cover Image">
                {formState.coverImageUrl ? (
                  <div
                    className="mt-3 overflow-hidden rounded-xl border border-lasa-200 bg-lasa-50"
                    style={{ aspectRatio: EVENT_FLYER_ASPECT_RATIO }}
                  >
                    <img
                      src={formState.coverImageUrl}
                      alt="Cover"
                      className="h-full w-full object-contain"
                    />
                  </div>
                ) : (
                  <p className="mt-2 text-sm text-lasa-500">No cover image yet.</p>
                )}
                <label className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-lasa-200 bg-white px-3 py-2 text-xs font-semibold text-lasa-600 hover:bg-lasa-100">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) uploadCover(file);
                    }}
                  />
                  {uploading ? 'Uploading...' : 'Upload Cover'}
                </label>
              </Field>

              <Field label="Gallery">
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {galleryItems.map((url, index) => (
                    <div key={`${url}-${index}`} className="overflow-hidden rounded-lg border border-lasa-200">
                      <img src={url} alt={`Gallery ${index + 1}`} className="h-28 w-full object-cover" />
                    </div>
                  ))}
                </div>
                {!galleryItems.length && (
                  <p className="mt-2 text-sm text-lasa-500">No gallery images yet.</p>
                )}
                <label className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-lasa-200 bg-white px-3 py-2 text-xs font-semibold text-lasa-600 hover:bg-lasa-100">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(event) => uploadGallery(Array.from(event.target.files || []))}
                  />
                  {uploading ? 'Uploading...' : 'Add Gallery Images'}
                </label>
              </Field>
            </div>
          </div>

          <div className="rounded-2xl border border-lasa-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-lasa-600">Flyer Generation</h2>
                <p className="text-sm text-lasa-500">
                  Generate flyer options and select the final design.
                </p>
              </div>
              <button
                type="button"
                onClick={handleGenerateFlyer}
                disabled={!isEditing || flyerLoading}
                className="rounded-xl bg-lasa-600 px-4 py-2 text-sm font-semibold text-white hover:bg-lasa-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {flyerLoading ? 'Generating...' : 'Generate Flyers'}
              </button>
            </div>

            {formState.flyerUrl && (
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-lasa-400">Selected Flyer</p>
                <div
                  className="mt-2 overflow-hidden rounded-xl border border-lasa-200 bg-lasa-50"
                  style={{ aspectRatio: EVENT_FLYER_ASPECT_RATIO }}
                >
                  <img src={formState.flyerUrl} alt="Selected flyer" className="h-full w-full object-contain" />
                </div>
                <a
                  href={formState.flyerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-lasa-600 hover:text-lasa-700"
                >
                  Download flyer
                </a>
              </div>
            )}

            {formState.flyerOptions?.length ? (
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {formState.flyerOptions.map((url) => (
                  <button
                    type="button"
                    key={url}
                    onClick={() => handleSelectFlyer(url)}
                    disabled={flyerLoading}
                    className="overflow-hidden rounded-xl border border-lasa-200 bg-lasa-50 text-left transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
                    style={{ aspectRatio: EVENT_FLYER_ASPECT_RATIO }}
                  >
                    <img src={url} alt="Flyer option" className="h-full w-full object-contain" />
                    <div className="px-4 py-3">
                      <p className="text-xs font-semibold text-lasa-500">Select this flyer</p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-lasa-500">
                Generate flyer options to choose from.
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3">
            <Link
              to={dashboardPath}
              className="rounded-xl border border-lasa-200 bg-white px-4 py-2 text-sm font-semibold text-lasa-600 hover:bg-lasa-100"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-lasa-600 px-6 py-2 text-sm font-semibold text-white hover:bg-lasa-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save Event'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block text-sm font-semibold text-lasa-600">
      <span>
        {label}{required && <span className="text-red-500"> *</span>}
      </span>
      {children}
    </label>
  );
}
