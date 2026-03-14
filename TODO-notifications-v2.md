# Notification Still Bottom-Left + Form Reset Fix

## Why Still Bottom?
Notifications in main.tsx has NO position prop → Mantine default 'bottom-right' 
Local `position: 'top-right'` in show() **overrides** it.

## EXACT Fix 1: DynamicForm.tsx onSubmit()
Replace the notifications.show():
```tsx
notifications.show({
  id: 'form-success',
  title: 'Success',
  message: 'Form submitted successfully!',
  color: 'green',
  position: 'top-right',
  top: 80,  // Above devtools
  styles: (theme) => ({
    toast: {
      maxWidth: '400px',
      zIndex: 9999,
    }
  })
});
```

## Fix 2: Form Reset (already partially working)
Your `setFormKey(prev => prev + 1)` works! But add explicit reset:
```tsx
const { register, handleSubmit, watch, control, formState: { errors }, reset } = useForm();

const onSubmit = (data) => {
  console.log(data);
  notifications.show({...});
  reset();  // ✅ Clear all fields
  setFormKey(prev => prev + 1);  
};
```

## Global Fix (main.tsx):
```tsx
<Notifications position='top-right' zIndex={9999} />
```

## Test Steps:
1. Add `position: 'top-right'` + `top: 80` to notifications.show()
2. Add `reset()` to onSubmit
3. Submit → notification TOP + form CLEAR

Browser console (F12): Check for notification CSS conflicts
