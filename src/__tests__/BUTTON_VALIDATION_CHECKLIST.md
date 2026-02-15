# Button Single-Icon Validation — Manual Test Checklist

This document provides a comprehensive manual test checklist for the Button component's single-icon validation rule.

**Reference:** `.rules/button-single-icon.md`

---

## Test Environment Setup

### Prerequisites
- Start the dev server: `npm run dev`
- Navigate to the Button component playground
- Open browser DevTools Console (F12)
- Clear console before each test

### Test Data
Use these icon JSX snippets in the playground props:

```jsx
// Leading icon example
<IconPlus />

// Trailing icon example
<IconChevronRight />

// Icon-only example
<IconX />
```

---

## 1. Component-Level Validation Tests

### ✅ Valid Configuration Cases

#### Test 1.1: No icon
**Setup:** Render Button with no icon props
```jsx
<Button variant="primary" size="md">
  Button Text
</Button>
```
**Expected Behavior:**
- [ ] Button renders without error
- [ ] Console shows no warnings
- [ ] Text is displayed
- [ ] Button is clickable

**Result:** ✅ PASS / ❌ FAIL

---

#### Test 1.2: Leading icon only
**Setup:** Render Button with leadingIcon prop only
```jsx
<Button variant="primary" size="md" leadingIcon={<IconPlus />}>
  Create New
</Button>
```
**Expected Behavior:**
- [ ] Button renders without error
- [ ] Console shows no warnings
- [ ] Icon appears on the left
- [ ] Text appears on the right
- [ ] Button is clickable

**Result:** ✅ PASS / ❌ FAIL

---

#### Test 1.3: Trailing icon only
**Setup:** Render Button with trailingIcon prop only
```jsx
<Button variant="primary" size="md" trailingIcon={<IconChevronRight />}>
  Next Step
</Button>
```
**Expected Behavior:**
- [ ] Button renders without error
- [ ] Console shows no warnings
- [ ] Icon appears on the right
- [ ] Text appears on the left
- [ ] Button is clickable

**Result:** ✅ PASS / ❌ FAIL

---

#### Test 1.4: Icon-only variant
**Setup:** Render Button with icon and iconOnly=true
```jsx
<Button variant="primary" size="icon-md" icon={<IconX />} iconOnly />
```
**Expected Behavior:**
- [ ] Button renders without error
- [ ] Console shows no warnings
- [ ] Only icon is visible (no text)
- [ ] Button has square shape
- [ ] Button is clickable

**Result:** ✅ PASS / ❌ FAIL

---

#### Test 1.5: Icon prop only (generic)
**Setup:** Render Button with icon prop only
```jsx
<Button variant="primary" size="md" icon={<IconStar />}>
  Favorite
</Button>
```
**Expected Behavior:**
- [ ] Button renders without error
- [ ] Console shows no warnings
- [ ] Icon is displayed (default position)
- [ ] Text is displayed
- [ ] Button is clickable

**Result:** ✅ PASS / ❌ FAIL

---

### ❌ Invalid Configuration Cases

#### Test 2.1: Both leadingIcon and trailingIcon
**Setup:** Render Button with both leadingIcon AND trailingIcon
```jsx
<Button
  variant="primary"
  size="md"
  leadingIcon={<IconArrowLeft />}
  trailingIcon={<IconArrowRight />}
>
  Navigate
</Button>
```
**Expected Behavior:**
- [ ] Button renders (no crash)
- [ ] Console shows **error message** containing:
  - "Multiple icons detected"
  - "leadingIcon, trailingIcon"
  - "only render one icon"
- [ ] Console shows **suggestion** with valid options
- [ ] Console shows link to `.rules/button-single-icon.md`
- [ ] Browser shows no console errors/exceptions

**Console Output Should Contain:**
```
❌ [Button] Multiple icons detected: leadingIcon, trailingIcon. A button can only render one icon.
💡 Remove all but one of: leadingIcon, trailingIcon. Valid: leadingIcon only, trailingIcon only, or icon only.
📖 See: .rules/button-single-icon.md
```

**Result:** ✅ PASS / ❌ FAIL

---

#### Test 2.2: leadingIcon + icon both provided
**Setup:** Render Button with both leadingIcon AND icon prop
```jsx
<Button
  variant="primary"
  size="md"
  leadingIcon={<IconPlus />}
  icon={<IconX />}
>
  Action
</Button>
```
**Expected Behavior:**
- [ ] Button renders (no crash)
- [ ] Console shows **error message** with "leadingIcon, icon"
- [ ] Console shows **suggestion**
- [ ] Console shows link to rule file
- [ ] No exception thrown

**Result:** ✅ PASS / ❌ FAIL

---

#### Test 2.3: trailingIcon + icon both provided
**Setup:** Render Button with both trailingIcon AND icon prop
```jsx
<Button
  variant="primary"
  size="md"
  trailingIcon={<IconChevronRight />}
  icon={<IconStar />}
>
  Next
</Button>
```
**Expected Behavior:**
- [ ] Button renders (no crash)
- [ ] Console shows **error message** with "trailingIcon, icon"
- [ ] Console shows **suggestion**
- [ ] Console shows link to rule file
- [ ] No exception thrown

**Result:** ✅ PASS / ❌ FAIL

---

#### Test 2.4: All three icon props provided
**Setup:** Render Button with leadingIcon, trailingIcon, AND icon
```jsx
<Button
  variant="primary"
  size="md"
  leadingIcon={<IconArrowLeft />}
  trailingIcon={<IconArrowRight />}
  icon={<IconStar />}
>
  Complex
</Button>
```
**Expected Behavior:**
- [ ] Button renders (no crash)
- [ ] Console shows **error message** with all three props
- [ ] Console shows **suggestion**
- [ ] Console shows link to rule file
- [ ] No exception thrown

**Result:** ✅ PASS / ❌ FAIL

---

## 2. Playground Constraint Tests

### Test 3.1: Size XL disables icon control
**Setup:** Open Button playground, set Size to "Extra Large"
**Expected Behavior:**
- [ ] Icon control is disabled (greyed out)
- [ ] Cannot select Left/Right icons
- [ ] Icon automatically resets to "None"

**Result:** ✅ PASS / ❌ FAIL

---

### Test 3.2: Size XL auto-resets icon placement
**Setup:**
1. Open Button playground
2. Set Size to "Medium"
3. Set Icon to "Left"
4. Change Size to "Extra Large"

**Expected Behavior:**
- [ ] Icon placement automatically resets to "None"
- [ ] Control visually updates
- [ ] No error messages shown

**Result:** ✅ PASS / ❌ FAIL

---

### Test 3.3: Icon Only + Left icon auto-correction
**Setup:**
1. Open Button playground
2. Set Icon to "Left"
3. Set Icon Only to "true"

**Expected Behavior:**
- [ ] Icon placement automatically resets to "None"
- [ ] Icon Only remains "true"
- [ ] Preview shows icon-only button (no text)
- [ ] No error messages

**Result:** ✅ PASS / ❌ FAIL

---

### Test 3.4: Icon Only + Right icon auto-correction
**Setup:**
1. Open Button playground
2. Set Icon to "Right"
3. Set Icon Only to "true"

**Expected Behavior:**
- [ ] Icon placement automatically resets to "None"
- [ ] Icon Only remains "true"
- [ ] Preview shows icon-only button (no text)

**Result:** ✅ PASS / ❌ FAIL

---

## 3. Production vs Development Mode

### Test 4.1: Development mode shows warnings
**Setup:** Run app with `npm run dev` (development mode)
**Expected Behavior:**
- [ ] Invalid icon configs show console errors
- [ ] Suggestions are logged
- [ ] Link to rule file appears

**Result:** ✅ PASS / ❌ FAIL

---

### Test 4.2: Production build suppresses warnings
**Setup:**
1. Build: `npm run build`
2. Run: `npm run start`
3. Test invalid icon config

**Expected Behavior:**
- [ ] Invalid config does not crash
- [ ] No console errors logged
- [ ] Button still renders and is functional (graceful degradation)

**Result:** ✅ PASS / ❌ FAIL

---

## 4. Edge Cases

### Test 5.1: Variant switching with icons
**Setup:**
1. Set Icon to "Left"
2. Switch variant: primary → secondary → tertiary → etc.

**Expected Behavior:**
- [ ] Icon placement is preserved
- [ ] Variant changes correctly
- [ ] No errors

**Result:** ✅ PASS / ❌ FAIL

---

### Test 5.2: Size switching (within valid range)
**Setup:**
1. Set Icon to "Right"
2. Switch size: sm → md → lg → xl → back to md

**Expected Behavior:**
- [ ] When size = xl: icon resets to "None"
- [ ] When size = md: icon can be set again
- [ ] No errors

**Result:** ✅ PASS / ❌ FAIL

---

### Test 5.3: Copy Props with single icon
**Setup:**
1. Set Icon to "Left"
2. Click "Copy Props JSON"
3. Inspect clipboard content

**Expected Behavior:**
- [ ] Copied JSON includes `leadingIcon: ...`
- [ ] No `trailingIcon` in JSON
- [ ] No `icon` in JSON
- [ ] No `state` or `iconPlacement` in JSON (simulation only)

**Result:** ✅ PASS / ❌ FAIL

---

### Test 5.4: Copy URL with icon state
**Setup:**
1. Set Icon to "Right"
2. Click "Copy URL"
3. Paste URL in new tab

**Expected Behavior:**
- [ ] URL includes `iconPlacement=right`
- [ ] Playground loads with same config
- [ ] Icon placement is "Right"
- [ ] No errors

**Result:** ✅ PASS / ❌ FAIL

---

## 5. Visual Regression Checks

### Test 6.1: Single-icon buttons match Figma
**Setup:** Compare each icon variant to Figma Button component
**Cases:**
- [ ] Left icon button (all variants)
- [ ] Right icon button (all variants)
- [ ] Icon-only button (all sizes)
- [ ] No icon button (all variants)

**Verification:**
- [ ] Icon sizing matches Figma (width/height)
- [ ] Icon alignment matches Figma (left/right/center)
- [ ] Gap between icon and text matches Figma
- [ ] Button height unchanged

**Result:** ✅ PASS / ❌ FAIL

---

### Test 6.2: Icon-only buttons are squares
**Setup:** Render icon-only buttons at each size
**Cases:**
- [ ] Size sm: 36px × 36px square
- [ ] Size md: 40px × 40px square
- [ ] Size lg: 44px × 44px square
- [ ] Size xl: 56px × 56px square

**Verification:**
- [ ] Width = Height
- [ ] No horizontal padding
- [ ] Icon is centered

**Result:** ✅ PASS / ❌ FAIL

---

## 6. Accessibility Checks

### Test 7.1: Icon-only buttons have accessible labels
**Setup:** Render icon-only button, inspect with accessibility tools
**Expected Behavior:**
- [ ] Button has accessible name/label
- [ ] Screen reader announces button purpose
- [ ] Focus ring is visible
- [ ] Tab order is correct

**Result:** ✅ PASS / ❌ FAIL

---

### Test 7.2: Icon with text has proper association
**Setup:** Render button with left icon and text
**Expected Behavior:**
- [ ] Screen reader announces both icon context and text
- [ ] Icon is not announced as separate element
- [ ] Focus ring encompasses entire button

**Result:** ✅ PASS / ❌ FAIL

---

## Summary

| Test Category | Passed | Failed | Total |
|---|---|---|---|
| Component Validation | ___ / 5 | | 5 |
| Invalid Cases | ___ / 4 | | 4 |
| Playground Constraints | ___ / 4 | | 4 |
| Dev vs Prod Mode | ___ / 2 | | 2 |
| Edge Cases | ___ / 4 | | 4 |
| Visual Regression | ___ / 2 | | 2 |
| Accessibility | ___ / 2 | | 2 |
| **TOTAL** | **___ / 23** | | **23** |

---

## Notes

- Run all tests in **development mode** first (`npm run dev`)
- Re-run invalid config tests in **production mode** (`npm run build && npm run start`)
- Document any failures with screenshots
- Reference `.rules/button-single-icon.md` for rule details
- Reference `.rules/ui-fidelity` for Figma comparison requirements
